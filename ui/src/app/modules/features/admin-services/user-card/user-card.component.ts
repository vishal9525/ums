import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  breadcrumbs:any=[
    {
      id: 1,
      name: 'Subscription',
      routerLink: 'subscription',
      active:true
    },
    {
      id: 2,
      name: 'User Card',
      routerLink: '',
      active:false
    }] 
}
