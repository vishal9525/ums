import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { featureRoutes } from './feature.routing.module';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './admin-services/dashboard/dashboard.component';
import { AddUserComponent } from './admin-services/add-user/add-user.component';
import { PaymentHistoryComponent } from './admin-services/payment-history/payment-history.component';
import { SubscriptionComponent } from './admin-services/subscription/subscription.component';
import { UserDetailsComponent } from './admin-services/user-details/user-details.component';
import { UserCardComponent } from './admin-services/user-card/user-card.component';

@NgModule({
  declarations: [
    FeaturesComponent,
    DashboardComponent,
    AddUserComponent,
    PaymentHistoryComponent,
    SubscriptionComponent,
    UserDetailsComponent,
    UserCardComponent
  ],
  imports: [
    SharedModule,
    featureRoutes
  ],
  providers: [],
})
export class FeaturesModule { }
