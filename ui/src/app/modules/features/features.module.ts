import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { featureRoutes } from './feature.routing.module';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './admin-services/dashboard/dashboard.component';
import { AddUserComponent } from './admin-services/add-user/add-user.component';
import { PaymentHistoryComponent } from './admin-services/payment-history/payment-history.component';
import { SubscriptionComponent } from './admin-services/subscription/subscription.component';

@NgModule({
  declarations: [
    FeaturesComponent,
    DashboardComponent,
    AddUserComponent,
    PaymentHistoryComponent,
    SubscriptionComponent
  ],
  imports: [
    SharedModule,
    featureRoutes
  ],
  providers: [],
})
export class FeaturesModule { }
