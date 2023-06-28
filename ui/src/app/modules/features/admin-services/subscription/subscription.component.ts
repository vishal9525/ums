import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements AfterViewInit {
  breadcrumbs:any=[
    {
      name: 'Subscription',
      routerLink: '',
      active:false
    }
 ] 
   names = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Williams',
    'Christopher Brown',
    'Olivia Jones',
    'Daniel Davis',
    'Sophia Anderson',
    'Matthew Wilson',
    'Ava Martinez',
    'William Taylor',
    'Isabella Thomas',
    'David Jackson',
    'Mia White',
    'Joseph Thompson',
    'Charlotte Garcia',
    'James Moore',
    'Abigail Lee',
    'Andrew Clark',
    'Ella Rodriguez'
  ];

   dataArray:any[] = [];

  
  displayedColumns: string[] = [ 'name',  'endDate','remainingDays'];
  dataSource: MatTableDataSource<any>;
  appName:string='';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private authService: AuthService,private route: ActivatedRoute) {
    this.appName = this.authService.getAppName();
  for (let i = 0; i < 20; i++) {
    const obj:any = {
      name: this.names[Math.floor(Math.random() * this.names.length)],
      endDate: new Date(Math.random() * (new Date().getTime() - 0) + 0).toISOString(),
      remainingDays: `${Math.floor(Math.random() * 10) + 1} days`
    };
    this.dataArray.push(obj);
  }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.dataArray);
    if (this.isMobileScreen()) {
      this.displayedColumns=['name','remainingDays']
      console.log('Mobile screen detected.');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getShortName(name:any){
    return this.authService.getShortName(name)
  }
  statusColor(days:any){
    const parts = days.split(' ');
    const number = parseInt(parts[0]);
    let displayColor: any
    if(number>5){
      displayColor = 'status-green'
    }else{
      displayColor = 'status-red'
    }
    return displayColor
  }
  isMobileScreen(): boolean {
    const mobileScreenWidthThreshold = 768; 
    return window.innerWidth < mobileScreenWidthThreshold;
  }

}
