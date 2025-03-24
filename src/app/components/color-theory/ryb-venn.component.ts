import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hallpass-ryb-venn',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative z-0 mx-auto bg-white" 
      [style.width.px]="size()" 
      [style.height.px]="size()">

      <div class="absolute bg-red-500/70 rounded-full -z-[1]"
        [style.top.px]="0"
        [style.left.px]="centerLine() - radius()"
        [style.width.px]="radius() * 2"
        [style.height.px]="radius() * 2"></div>
      <div class="absolute bg-red-500/50 rounded-full z-[1]"
        [style.top.px]="0"
        [style.left.px]="centerLine() - radius()"
        [style.width.px]="radius() * 2"
        [style.height.px]="radius() * 2"></div>

      <div class="absolute bg-yellow-500/70 rounded-full -z-[1]"
        [style.top.px]="radius() - offset()"
        [style.left.px]="radius() + 2 * offset()"
        [style.width.px]="radius() * 2"
        [style.height.px]="radius() * 2"></div>
      <div class="absolute bg-yellow-500/50 rounded-full z-[1]"
        [style.top.px]="radius() - offset()"
        [style.left.px]="radius() + 2 * offset()"
        [style.width.px]="radius() * 2"
        [style.height.px]="radius() * 2"></div>

      <div class="absolute bg-blue-500/70 rounded-full -z-[1]"
        [style.top.px]="radius() - offset()"
        [style.left.px]="0"
        [style.width.px]="radius() * 2"
        [style.height.px]="radius() * 2"></div>
      <div class="absolute bg-blue-500/50 rounded-full z-[1]"
        [style.top.px]="radius() - offset()"
        [style.left.px]="0"
        [style.width.px]="radius() * 2"
        [style.height.px]="radius() * 2"></div>

  `,
  styles: `
    :host { 
      display: block; 
      position: relative;
    }
  `
})
export class RybVennComponent {

  radius = input(200); //size of each circle in the venn diagram
  offset = computed(() => Math.round(this.radius() * .1)); //offset for positioning the circles
  size = computed(() => Math.round(this.radius() * 3 + this.offset())); //size of the venn diagram 
  centerLine = computed(() => Math.round(this.size() / 2)); //center line of the venn diagram
}
