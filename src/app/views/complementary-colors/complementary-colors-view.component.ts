import { Component, computed, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorTuple, isNullish, Nullable } from '../../../types';
import { StateService } from '../../../services';
import { rgbToHsl } from '../../../lib/transformations/rgb-to-hsl.fn';
import { hslToRgb } from '../../../lib/transformations/hsl-to-rgb.fn';
import { complementaryFormulaList } from '../../../types/complementary-formula.type';
import { complementaryFunction } from '../../../lib/complementary-formulas';

import { ColorMakerComponent } from '../../components/color-maker/color-maker.component';
import { ColorBoxHslComponent } from '../../components/color-box-hsl.component';
import { ColorBoxComplementComponent } from '../../components/color-box-complement';
import { ColorBoxComponent } from '../../components/color-box.component';
import { contrastRatio } from '../../../lib/transformations/contrast-ratio.fn';
import { rgbToHex } from '../../../lib/transformations/rgb-to-hex.fn';

@Component({
  selector: 'hallpass-complementary-colors-view',
  standalone: true,
  imports: [CommonModule, 
    ColorMakerComponent, ColorBoxComponent,
    ColorBoxComplementComponent, ColorBoxHslComponent,
  ],
  templateUrl: './complementary-colors-view.component.html',
  styles: ':host { display: block; }'
})
export class ComplementaryColorsViewComponent implements OnInit {
  private stateService = inject(StateService);

  color1 = model<Nullable<ColorTuple>>(null);

  currentColor1 = computed(() => this.color1() ?? [0,0,0]);

  rgb1 = computed(() => isNullish(this.color1()) ? 'transparent' : `rgb(${(this.color1() ?? []).join(',')})`);
  hex1 = computed(() => isNullish(this.color1()) ? 'transparent' : rgbToHex(this.color1() ?? [0,0,0]));

  complements = computed(() => {
    if (isNullish(this.color1())) {
      return null;
    }
    //else
    return complementaryFormulaList.map(formula => {
      const color = complementaryFunction[formula](this.color1() ?? [0,0,0]);
      const hsl = rgbToHsl(color);
      const hex = rgbToHex(color);
      const contrast = contrastRatio(this.color1() ?? [0,0,0], color);
      return {
        formula,
        color,
        hex,
        hsl,
        contrast,
      };
    });
  });

  hsl = computed(() => {
    if (isNullish(this.color1())) {
      return null;
    }
    return rgbToHsl(this.color1() ?? [0,0,0]);
  });

  colorFromHsl = computed(() => {
    if (isNullish(this.hsl())) {
      return null;
    }
    return hslToRgb(this.hsl() ?? [0,0,0]);
  });

  updateColor(color: Nullable<ColorTuple>) {
    this.color1.set(color);
  }

  ngOnInit(): void {
    const { colorHistory } = this.stateService.state();
    this.color1.set(colorHistory[0] ?? null);
  }

}
