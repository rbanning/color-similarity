import { Component, model, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorBoxComponent } from '../color-box.component';
import { ColorTuple } from '../../../types/color-tuple.type';

@Component({
  selector: 'hallpass-color-maker',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorBoxComponent],
  templateUrl: './color-maker.component.html',
  styles: ':host { display: block; }'
})
export class ColorMakerComponent {
  red = model(0);
  green = model(0);
  blue = model(0);

  save = output<ColorTuple>();

  saveColor() {
    this.save.emit([this.red(), this.green(), this.blue()]);
  }
}
