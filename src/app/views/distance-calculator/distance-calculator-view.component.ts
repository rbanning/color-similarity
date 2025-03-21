import { Component, computed, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorTuple, DistanceFormula, distanceFormulaList, isNullish, Nullable } from '../../../types';
import { ColorMakerComponent } from '../../components/color-maker/color-maker.component';
import { DistanceFormulaSelectorComponent } from '../../components/distance-formula-selector/distance-formula-selector.component';
import { StateService } from '../../../services';
import { distanceFunction } from '../../../lib/distance-formulas';

@Component({
  selector: 'hallpass-distance-calculator-view',
  standalone: true,
  imports: [CommonModule, 
    ColorMakerComponent,
    DistanceFormulaSelectorComponent
  ],
  templateUrl: './distance-calculator-view.component.html',
  styles: ':host { display: block; }'
})
export class DistanceCalculatorViewComponent implements OnInit {
  private stateService = inject(StateService);

  distanceFormula = model<DistanceFormula>(distanceFormulaList[0]);
  showDistanceFormulaSelector = model(false);

  color1 = model<Nullable<ColorTuple>>(null);
  color2 = model<Nullable<ColorTuple>>(null);

  currentColor1 = computed(() => this.color1() ?? [0,0,0]);
  currentColor2 = computed(() => this.color2() ?? [0,0,0]);


  rgb1 = computed(() => isNullish(this.color1()) ? 'transparent' : `rgb(${(this.color1() ?? []).join(',')})`);
  rgb2 = computed(() => isNullish(this.color2()) ? 'transparent' : `rgb(${(this.color2() ?? []).join(',')})`);

  simpleDistance = computed(() => {
    if (isNullish(this.color1()) || isNullish(this.color2())) {
      return null;
    }
    const fn = distanceFunction[this.distanceFormula()];
    return fn(this.color1()!, this.color2()!);
  });


  ngOnInit(): void {
    const { distanceFormula, colorHistory } = this.stateService.state();
    this.distanceFormula.set(distanceFormula);

    this.color1.set(colorHistory[0] ?? null);
    this.color2.set(colorHistory[1] ?? null);
  }

  

  updateColor(id: 1 | 2, color: Nullable<ColorTuple>) {
    if (id === 1) {
      this.color1.set(color);
    } else {
      this.color2.set(color);
    }
    if (color) {
      this.stateService.addColor(color);  //save in state
    }
  }

  
  selectDistanceFormula(formula: Nullable<DistanceFormula>) {
    if (formula) {
      this.distanceFormula.set(formula);
      this.stateService.setDistanceFormula(formula); //save in state
    }    
    this.showDistanceFormulaSelector.set(false);
  }

}
