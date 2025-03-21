import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ColorTuple, DistanceFormula } from '../types';
import { IColor, parseRgb } from '../models';
import { LoadingService } from './loading.service';
import { distanceFunction } from '../lib/distance-formulas';


@Injectable({
  providedIn: 'root'
})
export class ColorService extends LoadingService {
  private colorsSignal = signal<IColor[]>([]);
  private http = inject(HttpClient);

  colors = this.colorsSignal.asReadonly();

  async load() {
    if (this.colors().length === 0) {
      return await this.refresh();
    }
    //else (already loaded)
    return Promise.resolve(true);
  }

  async refresh() {
    this.setLoading(true);    
    return new Promise<boolean>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.http.get<any[]>('/data/colors.json')
        .pipe(
          map(resp => {
            if (!Array.isArray(resp)) {
              throw new Error('Invalid response');
            }
            return resp.map(c => {              
              const rgb = parseRgb(c.rgb);
              if (!rgb) {
                console.warn('Unable to convert to IColor', c);
                throw new Error('Invalid RGB value');
              }
              return {
                id: c.hex,
                name: c.name,
                rgb,
                families: c.families
              };
            });
          })
        )
        .subscribe({
          next: colors => {
            this.colorsSignal.set(colors);
            this.setLoading(false);
            resolve(true);
          },
          error: (reason) => {
            console.warn('Failed to load colors', {reason});
            this.setLoading(false);
            reject(reason);
          }
        });
    });
  }

  sortBySimilarity(color: ColorTuple, method: DistanceFormula) {

    const fn = distanceFunction[method];
    const colors = [...this.colors()];
    colors.sort((a, b) => fn(color, a.rgb) - fn(color, b.rgb));
    this.colorsSignal.set(colors);

  }



}