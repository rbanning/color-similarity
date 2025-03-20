import { Component, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hallpass-color-box',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: ':host { display: block; width: 140px; height: 140px; }'
})
export class ColorBoxComponent {
  red = input(0, { transform: toColorNumber });
  green = input(0, { transform: toColorNumber });
  blue = input(0, { transform: toColorNumber });

  @HostBinding('style.background-color')
  get backgroundColor() {
    return `rgb(${this.red()}, ${this.green()}, ${this.blue()})`;
  };


}

function toColorNumber(value: unknown): number {
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : value;
  }
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
} 
