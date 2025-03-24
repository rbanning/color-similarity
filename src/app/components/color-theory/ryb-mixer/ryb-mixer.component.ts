import { AfterViewInit, Component, computed, ElementRef, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';


const opacity = [1, 0.5, 0.33];

@Component({
  selector: 'hallpass-ryb-mixer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ryb-mixer.component.html',
  styles: ':host { display: block; }'
})
export class RybMixerComponent implements AfterViewInit {

  size = input(400); //base width of the mixer area
  unitSize = computed(() => Math.round(this.size() / 9)); //size of each vertical block
  width = computed(() => this.unitSize() * 9); //width of mixer area
  height = computed(() => this.unitSize() * 3); //height of mixer area

  @ViewChild('wrapper', { static: false }) wrapper!: ElementRef<HTMLDivElement>;



  ngAfterViewInit(): void {
    if (this.wrapper?.nativeElement) {
      const wrapper = this.wrapper.nativeElement;
      const blocks = {
        red: Array.from(wrapper.querySelectorAll('.red-block')) as HTMLDivElement[],
        yellow: Array.from(wrapper.querySelectorAll('.yellow-block')) as HTMLDivElement[],
        blue: Array.from(wrapper.querySelectorAll('.blue-block')) as HTMLDivElement[]
      };

      console.log("blocks", {blocks});

      blocks.red.forEach((block, index) => {
        block.style.transform = `translate(${(3 * this.unitSize()) +  index * this.unitSize()}px, 0px)`;
        block.style.opacity = `${opacity[index]}`;
      });

      blocks.blue.forEach((block, index) => {
        block.style.transform = `translate(${index * this.unitSize()}px, ${2 * this.unitSize()}px)`;
        block.style.opacity = `${opacity[index]}`;
      });

      blocks.yellow.forEach((block, index) => {
        block.style.transform = `translate(${(6 * this.unitSize()) + index * this.unitSize()}px, ${2 * this.unitSize()}px)`;
        block.style.opacity = `${opacity[index]}`;
      });
    }
  }
}
