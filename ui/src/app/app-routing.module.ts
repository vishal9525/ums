import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app/:appId', loadChildren: () => import('./modules/features/features.module').then(m => m.FeaturesModule) },
  { path: 'onboarding', loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnBoardingModule) },
  { path: 'register/:appId', loadChildren: () => import('./modules/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
