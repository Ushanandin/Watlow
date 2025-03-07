import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (mod) => mod.HomePageComponent
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list-view/list-view.component').then(
        (mod) => mod.ListViewComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./detail/detail.component').then((mod) => mod.DetailComponent),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
