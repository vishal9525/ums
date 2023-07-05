import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth-service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/${this.authService.getAppName()}`]);
    }
  }
  onSubmit() {
    this.authService
      .authenticateUser(
        this.usernameFormControl.value,
        this.passwordFormControl.value
      ).subscribe(response => {
          var authData: any = response;
          console.log(authData)
          if (authData["status"] === "success") {
            localStorage.setItem("adminId", authData["adminId"]);
            localStorage.setItem("token", authData["token"]);
            window.location.reload()
          } else {
           this.toastr.error(authData["message"], "Login Failed"); 
          }
        }
      ); 
  }
}
