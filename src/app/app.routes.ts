import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home-view.component').then(m => m.HomeViewComponent)
  },
  { path: 'distance-calculator', 
    loadComponent: () => import('./views/distance-calculator/distance-calculator-view.component')
      .then(m => m.DistanceCalculatorViewComponent) 
  }, 
  { path: 'similarity-hunt', 
    loadComponent: () => import('./views/similarity-hunt/similarity-hunt-view.component')
      .then(m => m.SimilarityHuntViewComponent) 
  }, 
  { path: 'complementary-colors', 
    loadComponent: () => import('./views/complementary-colors/complementary-colors-view.component')
      .then(m => m.ComplementaryColorsViewComponent) 
  }, 
];
