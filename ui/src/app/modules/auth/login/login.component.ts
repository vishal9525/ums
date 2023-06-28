import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/${this.authService.getAppName()}`]);
    }
  }
  onSubmit() {

    this.authService
      .authenticateUser(
        this.emailFormControl.value,
        this.passwordFormControl.value
      ).subscribe(response => {
          var authData: any = response;
          if (authData["status"] === "success") {
            localStorage.setItem("user_id", authData["user_id"]);
            localStorage.setItem("token", authData["token"]);
            localStorage.setItem("role", authData["role"]);
            localStorage.setItem("appName", 'my-app');
            window.location.reload()
            this.router.navigate([`/${this.authService.getAppName()}`]);
          } else {
           /*  this.toastr.error(authData["message"], "Login Failed", {
              timeout: 5000,
              position: SnotifyPosition.rightTop,
            }); */
          }
        }
      );
  }
}
