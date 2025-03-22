import { Component, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hallpass-color-box-custom',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: ':host { display: flex; flex-direction: column; justify-content: center; align-items: center; }'
})
export class ColorBoxCustomComponent {
  red = input(0, { transform: toColorNumber });
  green = input(0, { transform: toColorNumber });
  blue = input(0, { transform: toColorNumber });

  width = input(10, { transform: toColorNumber });
  height = input(10, { transform: toColorNumber });

  @HostBinding('style.background-color')
  get backgroundColor() {
    return `rgb(${this.red()}, ${this.green()}, ${this.blue()})`;
  };

  @HostBinding('style.width.px')
  get boxWidth() {
    return this.width();
  }
  @HostBinding('style.height.px')
  get boxHeight() {
    return this.height();
  }

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
