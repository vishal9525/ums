import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  breadcrumbs:any=[
    {
      id: 1,
      name: 'My Profile',
      routerLink: 'my-profile',
      active:true
    }] 
formProperties:any={
  showEditButton:true,
  showIcon:false,
  title:'My Profile',
  otherForm:false,  //this indicate you are accessing your own details or others details
}
}
