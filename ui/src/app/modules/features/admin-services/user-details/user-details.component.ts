import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
 breadcrumbs:any=[
  {
    id: 1,
    name: 'Dashboard',
    routerLink: 'dashboard',
    active:true
  },
  {
    id: 2,
    name: 'User Details',
    routerLink: '',
    active:false
  }] 
}
