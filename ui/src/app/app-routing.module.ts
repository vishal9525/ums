import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/services/auth-service';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./modules/features/features.module').then(m => m.FeaturesModule) },
  { path: 'onboarding', loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnBoardingModule) },
  { path: 'user', loadChildren: () => import('./modules/user-services/user-services.module').then(m => m.UserServiceModule) },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private appNameService: AuthService) {
    const appName = this.appNameService.getAppName()
    if(appName !== null){
      routes[2].path = appName;
    }
  }
}
