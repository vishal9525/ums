import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  constructor(private http:HttpClient){}
  adminId=null;
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
    ],
  };
  getServices() {
    return this.serviceoptions;
  }
  fetchAdminId(adminId:any){
   this.adminId=adminId;
  }
  createAdmin(req:any){
    return this.http.post('http://localhost:3000/admin',req)
  }
  getSingleAdminDetail(){
    return this.http.get<any>(`http://localhost:3000/admin/${this.adminId}`)
  }
  getAllAppDetails(){
    return this.http.get<any[]>('http://localhost:3000/admin')
  }
  updateAdminStatus(status:any){
    let req={
      status:status
    }
    return this.http.put<any>(`http://localhost:3000/admin/status/${this.adminId}`,req)
  }
  updateAdminDetails(req:any){
    return this.http.put<any>(`http://localhost:3000/admin/${this.adminId}`,req)
  }
}
