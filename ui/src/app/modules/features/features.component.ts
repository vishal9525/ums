import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  modeOfSidebar: any = 'side';
  defaultOpeninig: boolean = true;
  userDetails:any
  constructor(private authService: AuthService, private router: Router,  private toastr: ToastrService) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else{
      this.router.navigate([`/${this.authService.getAppName()}`]);
    } 
    this.modeOfSidebar = 'side';
    this.defaultOpeninig = true;
    if (window.innerWidth < 680) {
      this.modeOfSidebar = 'over';
      this.defaultOpeninig = false;
    }
    this.getUserDetails();
  }

  getUserDetails() {
    let adminId=localStorage.getItem("adminId")
    if(adminId!=null){
      this.authService.getAdminDetails(adminId).subscribe(
        (response) => {
          var userData: any = response;
          if (userData) {
             this.userDetails=userData.jsonBody;
          } else {
           this.toastr.error('Failed to load the user Details.','User Details'  ); 
          }
        });
    }
    }
}
