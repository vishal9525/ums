import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  optionsStatusListener = new Subject<any>();

  constructor(private http:HttpClient){}
  serviceoptions = {
    userServices: [
      {
        id: 1,
        show: true,
        name: 'Subscription',
        iconName: 'dynamic_form',
        routerLink: 'subscription',
      },
      {
        id: 2,
        show: false,
        name: 'Reserve Seat',
        iconName: 'developer_board',
        routerLink: 'create-advance-form',
      },
      {
        id: 3,
        show: true,
        name: 'Add User',
        iconName: 'corporate_fare',
        routerLink: 'add-user',
      },
      {
        id: 4,
        show: false,
        name: 'Expense Management',
        iconName: 'contact_page',
        routerLink: 'leave',
      },
      {
        id: 5,
        show: false,
        name: 'Payment History',
        iconName: 'price_change',
        routerLink: 'payment-history',
      },
      {
        id: 6,
        show: false,
        name: 'Feedback',
        iconName: 'help_outline',
        routerLink: 'helpdesk',
      },
    ],

    adminServices: [
      {
        id: 1,
        show: true,
        name: 'Admin Portal',
        iconName: 'toggle_on',
        routerLink: 'admin-portal',
      },
      {
        id: 2,
        show: true,
        name: 'Add User',
        iconName: 'corporate_fare',
        routerLink: 'add-user',
      },
    ],
  };
  getServices() {
    return this.serviceoptions;
  }
  submitServiceOptions(data: any) {
    this.optionsStatusListener.next(data);
  }
  getOptionsStatusListener() {
    return this.optionsStatusListener.asObservable();
  }
  createAdmin(req:any){
    return this.http.post('http://localhost:3000/admin',req)
  }
}
