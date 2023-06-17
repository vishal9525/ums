import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  modeOfSidebar: any = 'side';
  defaultOpeninig: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.modeOfSidebar = 'side';
    this.defaultOpeninig = true;
    console.log('this.defaultOpeninig--', window.innerWidth);
    if (window.innerWidth < 680) {
      this.modeOfSidebar = 'over';
      this.defaultOpeninig = false;
    }
  }
}
