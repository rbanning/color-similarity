import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home-view.component').then(m => m.HomeViewComponent)
  },
  { path: 'euclidean', 
    loadComponent: () => import('./views/euclidean/euclidean-view.component').then(m => m.EuclideanViewComponent) 
  } 
];
