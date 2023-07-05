import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminServices } from 'src/app/core/services/admin.services';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @Input() userDetails:any;
  constructor(
    private authService: AuthService,
    private adminService: AdminServices,
  
  ) {}
  activeUserServices: any[] = [];
  activeAdminService: any[] = [];
  serviceOptions: any = {};

  ngOnInit() {
    let role=this.authService.getUserRole();
    this.serviceOptions = this.adminService.getServices();
    if(role=='superAdmin'){
      this.activeUserServices = this.serviceOptions.adminServices;
    }else{
      this.activeUserServices = this.serviceOptions.userServices;
    }
  }
  onClose() {
    if (window.innerWidth > 680) {
      return;
    }
    this.closeSidenav.emit();
  }
  logOut() {
    localStorage.clear();
  }


}