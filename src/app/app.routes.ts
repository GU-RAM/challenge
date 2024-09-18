import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: '',
    loadComponent: () =>
      import('./pages/layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/card-details/card-details.component').then(
            (m) => m.CardDetailsComponent
          ),
      },
      {
        path: 'main',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/home/products-and-progress/products-and-progress.component'
              ).then((m) => m.ProductsAndProgressComponent),
            children: [
              {
                path: ':id',
                loadComponent: () =>
                  import(
                    './pages/home/progress-bar/progress-bar.component'
                  ).then((m) => m.ProgressBarComponent),
              },
            ],
          },
        ],
      },
      {
        path: 'video-instruction',
        loadComponent: () =>
          import(
            './components/video-popup-handler/video-popup-handler.component'
          ).then((m) => m.VideoPopupHandlerComponent),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404',
  },
];
