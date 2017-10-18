import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'signin', component: AuthComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);