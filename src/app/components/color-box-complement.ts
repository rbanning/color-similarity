import { Component, computed, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorTuple, Nullable } from '../../types';

@Component({
  selector: 'hallpass-color-box-complement',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="base" [style.backgroundColor]="baseBG()"></span>
  `,
  styles: `
    :host { 
      position: relative; z-index: 0; display: block; 
      width: 140px; height: 140px; 
    }
    .base {
      position: absolute; z-index: 1;
      right: 0; bottom: 0;
      width: 80px; height: 30px;
    }
  `
})
export class ColorBoxComplementComponent {
  bgColor = input<Nullable<ColorTuple>>();
  baseColor = input<Nullable<ColorTuple>>();

  baseBG = computed(() => 
    this.baseColor()
      ? `rgb(${this.baseColor()![0]}, ${this.baseColor()![1]}, ${this.baseColor()![2]})`
      : 'transparent'
  );

  @HostBinding('style.background-color')
  get backgroundColor() {
    return this.bgColor()
      ? `rgb(${this.bgColor()![0]}, ${this.bgColor()![1]}, ${this.bgColor()![2]})`
      : 'transparent';
  };

  
}

