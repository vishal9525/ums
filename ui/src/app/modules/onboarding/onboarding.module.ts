import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';

@NgModule({
  declarations: [
       OnboardingFormComponent
  ],
  imports: [
    OnboardingRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class OnBoardingModule { }
