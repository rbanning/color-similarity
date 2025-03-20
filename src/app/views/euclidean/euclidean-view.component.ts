import { Component, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorTuple, DistanceFormula, distanceFormulaList, isNullish, Nullable } from '../../../types';
import { ColorMakerComponent } from '../../components/color-maker/color-maker.component';
import { ColorSelectorComponent } from '../../components/color-selector/color-selector.component';
import { DistanceFormulaSelectorComponent } from '../../components/distance-formula-selector/distance-formula-selector.component';

@Component({
  selector: 'hallpass-euclidean-view',
  standalone: true,
  imports: [CommonModule, 
    ColorMakerComponent, ColorSelectorComponent,
    DistanceFormulaSelectorComponent
  ],
  templateUrl: './euclidean-view.component.html',
  styles: ':host { display: block; }'
})
export class EuclideanViewComponent {

  distanceFormula = model<DistanceFormula>(distanceFormulaList[0]);
  showDistanceFormulaSelector = model(false);

  color1 = model<Nullable<ColorTuple>>(null);
  color2 = model<Nullable<ColorTuple>>(null);

  rgb1 = computed(() => isNullish(this.color1()) ? 'transparent' : `rgb(${(this.color1() ?? []).join(',')})`);
  rgb2 = computed(() => isNullish(this.color2()) ? 'transparent' : `rgb(${(this.color2() ?? []).join(',')})`);

  simpleDistance = computed(() => {
    if (isNullish(this.color1()) || isNullish(this.color2())) {
      return null;
    }
    //typescript cannot infer that the colors are not nullish
    const [r1=0, g1=0, b1=0] = this.color1() ?? [];
    const [r2=0, g2=0, b2=0] = this.color2() ?? [];
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  });

  updateColor(id: 1 | 2, color: Nullable<ColorTuple>) {
    if (id === 1) {
      this.color1.set(color);
    } else {
      this.color2.set(color);
    }
  }

  
  selectDistanceFormula(formula: Nullable<DistanceFormula>) {
    if (formula) {
      this.distanceFormula.set(formula);
    }
    this.showDistanceFormulaSelector.set(false);
  }

}
