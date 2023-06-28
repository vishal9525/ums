import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-breadcrumbs-nav',
  templateUrl: './breadcrumbs-nav.component.html',
  styleUrls: ['./breadcrumbs-nav.component.css']
})
export class BreadcrumbsNavComponent {
  appName:string=''
  constructor(private authService: AuthService){
   this.appName=this.authService.getAppName();
  }
  @Input() navList:any


}
