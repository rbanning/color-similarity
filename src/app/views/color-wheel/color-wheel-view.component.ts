import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartesianToPolar } from '../../../lib/transformations/cartesian-to-polar.fn';
import { radianToDegree } from '../../../lib/transformations/radian-to-degree.fn';
import { hsvToRgb } from '../../../lib/transformations/hsv-to-rgb.fn';
import { RybVennComponent } from '../../components/color-theory/ryb-venn.component';
import { RybMixerComponent } from '../../components/color-theory/ryb-mixer/ryb-mixer.component';

@Component({
  selector: 'hallpass-color-wheel-view',
  standalone: true,
  imports: [CommonModule, 
    RybVennComponent, RybMixerComponent
  ],
  templateUrl: './color-wheel-view.component.html',
  styles: ':host { display: block; }'
})
export class ColorWheelViewComponent implements AfterViewInit {
  readonly radius = 150;

  @ViewChild('colorCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;

  @ViewChild('colorCircle', { static: false }) circleRef!: ElementRef<HTMLDivElement>;
  
  
  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.drawCanvasCircle();

    this.drawHtmlCircle();
  }

  drawHtmlCircle() {
    if (!this.circleRef.nativeElement) {
      return;
    }
    const div = this.circleRef.nativeElement;
    div.style.width = `${this.radius * 2}px`;
    div.style.height = `${this.radius * 2}px`;
    const slices = Array.from(div.querySelectorAll('.slice'));
    console.log({slices});
  }

  // - ref: https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
  drawCanvasCircle() {
    if (!this.ctx) {
      return;
    }
    const image = this.ctx.createImageData(2*this.radius, 2*this.radius);
    const data = image.data;

    for (let x = -this.radius; x < this.radius; x++) {
      for (let y = -this.radius; y < this.radius; y++) {

        const [r, phi] = cartesianToPolar(x, y);
        
        if (r > this.radius) {
          // skip all (x,y) coordinates that are outside of the circle
          continue;
        }
        
        const deg = radianToDegree(phi);

        // Figure out the starting index of this pixel in the image data array.
        const rowLength = 2 * this.radius;
        const adjustedX = x + this.radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
        const adjustedY = y + this.radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
        const pixelWidth = 4; // each pixel requires 4 slots in the data array
        const index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;

        const hue = deg;
        const saturation = r / this.radius; // normalize r to be between 0 and 1 (0 is center of circle, 1 is edge of circle);
        const value = 1.0;
        const [red, green, blue] = hsvToRgb(hue, saturation, value);

        data[index] = red;
        data[index+1] = green;
        data[index+2] = blue;
        data[index+3] = 255; // alpha channel (opacity) is always 255 for fully opaque
      }
    }

    this.ctx.putImageData(image, 0, 0);
  }
}
