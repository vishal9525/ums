import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent {
  breadcrumbs:any=[
    {
      id: 1,
      name: 'Dashboard',
      routerLink: 'dashboard',
      active:true
    },
    {
      id: 2,
      name: 'Admin Details',
      routerLink: '',
      active:false
    }] 
formProperties:any={
  disable:true,
  showEditButton:true,
  showIcon:false,
  title:'Admin Details'
}

}
