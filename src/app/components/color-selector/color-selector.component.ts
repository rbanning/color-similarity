import { Component, inject, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorService } from '../../../services';
import { IColor } from '../../../models';
import { Nullable } from '../../../types';
import { ColorBoxComponent } from "../color-box.component";

@Component({
  selector: 'hallpass-color-selector',
  standalone: true,
  imports: [CommonModule, ColorBoxComponent],
  templateUrl: './color-selector.component.html',
  styles: ':host { display: block; }'
})
export class ColorSelectorComponent implements OnInit {
  protected colorService = inject(ColorService);
  colors = this.colorService.colors;
  isLoading = this.colorService.isLoading;
  selected: Nullable<IColor> = null;

  colorSelected = output<Nullable<IColor>>();

  selectColor(color: IColor) { 
    this.selected = this.selected?.id === color.id
      ? null
      : color;
    this.colorSelected.emit(this.selected);
    console.log('selectColor', {color, selected: this.selected });   
  }

  ngOnInit() {
    this.colorService.load();
  }

  
}
