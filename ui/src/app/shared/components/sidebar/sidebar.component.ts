import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminServices } from 'src/app/core/services/admin.services';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user_name: any;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(
    private authService: AuthService,
    private adminService: AdminServices
  ) {}
  activeUserServices: any[] = [];
  activeAdminService: any[] = [];
  serviceOptions: any = {};

  ngOnInit() {
    this.getUserDetails();
    this.user_name='Vikram Singh'
    this.serviceOptions = this.adminService.getServices();
    this.activeAdminService = this.serviceOptions.adminServices.filter(
      (element: any) => element.show === true
    );
    this.activeUserServices = this.serviceOptions.userServices.filter(
      (element: any) => element.show === true
    );
    this.adminService.getOptionsStatusListener().subscribe((resp) => {
      this.serviceOptions = resp;
      this.activeAdminService = this.serviceOptions.adminServices.filter(
        (element: any) => element.show === true
      );
      this.activeUserServices = this.serviceOptions.userServices.filter(
        (element: any) => element.show === true
      );
    });
  }
  onClose() {
    if (window.innerWidth > 680) {
      return;
    }
    this.closeSidenav.emit();
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('submenuName');
  }
  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (response) => {
        var userData: any = response;
        if (userData?.user_name) {
          this.user_name = userData['user_name'];
          localStorage.setItem('user_name', this.user_name);
        } else {
       /*    this.toastr.error(
            'Failed to load the user Details.',
            'User Details',
            { timeout: 5000, position: SnotifyPosition.rightTop }
          ); */
        }
      },
      (error) => {
     /*    this.toastr.error('Please try again later.', 'User Details', {
          timeout: 5000,
          position: SnotifyPosition.rightTop,
        }); */
      }
    );
  }
}