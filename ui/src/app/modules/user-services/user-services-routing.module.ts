import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth-guard";
import { IdCardComponent } from "./id-card/id-card.component";
import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "register/:appId",
        component: UserRegistrationFormComponent
      },
      {
        path: "id-card/:appId",
        component: IdCardComponent
      }
    ]
  },
];
export const UserServicesRoutingModule = RouterModule.forChild(routes);
