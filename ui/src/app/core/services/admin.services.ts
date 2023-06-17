import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  optionsStatusListener = new Subject<any>();
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
        show: true,
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
        show: true,
        name: 'Expense Management',
        iconName: 'contact_page',
        routerLink: 'leave',
      },
      {
        id: 5,
        show: true,
        name: 'Payment History',
        iconName: 'price_change',
        routerLink: 'payment-history',
      },
      {
        id: 6,
        show: true,
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
}
