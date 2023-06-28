import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IdCardComponent } from './id-card/id-card.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserServicesRoutingModule } from './user-services-routing.module';

@NgModule({
  declarations: [
  
    UserRegistrationFormComponent,
    IdCardComponent
  ],
  imports: [
    UserServicesRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class UserServiceModule { }
