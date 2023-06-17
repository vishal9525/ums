import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';

const routes: Routes = [
  { path: '', component: OnboardingFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
