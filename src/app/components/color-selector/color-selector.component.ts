import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorService } from '../../../services';
import { IColor } from '../../../models';
import { ColorTuple, DistanceFormula, Nullable } from '../../../types';
import { ColorBoxComponent } from "../color-box.component";
import { distanceFunction } from '../../../lib/distance-formulas';

@Component({
  selector: 'hallpass-color-selector',
  standalone: true,
  imports: [CommonModule, ColorBoxComponent],
  templateUrl: './color-selector.component.html',
  styles: ':host { display: block; }'
})
export class ColorSelectorComponent implements OnInit {
  protected colorService = inject(ColorService);
  protected colorList = this.colorService.colors;

  isLoading = this.colorService.isLoading;
  selected: Nullable<IColor> = null;

  similarTo = input<Nullable<ColorTuple>>();
  distanceFormula = input<Nullable<DistanceFormula>>();

  colors = computed(() => {
    if (this.similarTo() && this.distanceFormula()) {
      console.log("sorted the colors", {similarTo: this.similarTo(), distanceFormula: this.distanceFormula()});
      const fn = distanceFunction[this.distanceFormula()!]; // ! to assert non-null (TS doesn't handle this well)
      const colors = this.colorList();
      colors.sort((a, b) => {
        const distanceA = fn(a.rgb, this.similarTo()!);
        const distanceB = fn(b.rgb, this.similarTo()!);
        return distanceA - distanceB;
      });
      return colors;
    }
    //else - return the original list
    return this.colorList();
  });

  colorSelected = output<Nullable<IColor>>();


  //(re)ordering the colors
  

  selectColor(color: IColor) { 
    this.selected = this.selected?.id === color.id
      ? null
      : color;
    this.colorSelected.emit(this.selected);
  }

  ngOnInit() {
    this.colorService.load();
  }

  
}
