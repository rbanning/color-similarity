import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistanceFormula } from '../../../types/distance-formula.type';
import { Nullable, distanceFormulaList } from '../../../types';

@Component({
  selector: 'hallpass-distance-formula-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './distance-formula-selector.component.html',
  styles: ':host { display: block; }'
})
export class DistanceFormulaSelectorComponent {
  show = input(false);

  options = distanceFormulaList;

  formulaSelected = output<DistanceFormula>();
  formulaCanceled = output<void>();

  selectFormula(formula: Nullable<DistanceFormula>) {
    if (formula) {
      this.formulaSelected.emit(formula);
    }
    else {
      this.formulaCanceled.emit();
    }
  }
}
