import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth-guard";
import { AddUserComponent } from "./admin-services/add-user/add-user.component";
import { DashboardComponent } from "./admin-services/dashboard/dashboard.component";
import { PaymentHistoryComponent } from "./admin-services/payment-history/payment-history.component";
import { SubscriptionComponent } from "./admin-services/subscription/subscription.component";
import { FeaturesComponent } from "./features.component";

const routes: Routes = [
  {
    path: "",
    component: FeaturesComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "add-user",
        component: AddUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "subscription",
        component: SubscriptionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "payment-history",
        component: PaymentHistoryComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];
export const featureRoutes = RouterModule.forChild(routes);
