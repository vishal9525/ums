import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-nav',
  templateUrl: './breadcrumbs-nav.component.html',
  styleUrls: ['./breadcrumbs-nav.component.css']
})
export class BreadcrumbsNavComponent {
@Input() navList:any


}
