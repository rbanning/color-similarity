import { Component, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hallpass-color-box-hsl',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: ':host { display: flex; flex-direction: column; justify-content: center; align-items: center; width: 140px; height: 140px; }'
})
export class ColorBoxHslComponent {
  hue = input(0, { transform: toColorNumber });
  saturation = input(0, { transform: toColorNumber });
  luminance = input(0, { transform: toColorNumber });

  @HostBinding('style.background-color')
  get backgroundColor() {
    return `hsl(${this.hue()}deg, ${this.saturation()*100}%, ${this.luminance()*100}%)`;
  };


}

function toColorNumber(value: unknown): number {
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : value;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
} 
