import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found.component';
import { SignUpComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { HistoryComponent } from './history/history.component';
import { NestComponent } from './nest/nest.component';
import { AuthGuard } from './shared/index';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'declaration', component:DeclarationComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'nest', component: NestComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);