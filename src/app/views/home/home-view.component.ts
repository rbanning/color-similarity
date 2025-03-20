import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hallpass-home-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-view.component.html',
  styles: ':host { display: block; }'
})
export class HomeViewComponent {


}
