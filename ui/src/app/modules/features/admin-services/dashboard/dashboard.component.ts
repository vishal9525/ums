import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminServices } from 'src/app/core/services/admin.services';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  linkType:string='user-details'
  breadcrumbs: any = [
    {
      name: 'Dashboard',
      routerLink: '',
      active: false
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

  statuses = ['Active', 'Registered', 'Pending', 'Deactivated'];

  dataArray: any[] = [];


  displayedColumns: string[] = ['name', 'status', 'date'];
  dataSource: MatTableDataSource<any>;
  appName: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private route: ActivatedRoute, private adminService: AdminServices) {
    this.appName = this.authService.getAppName();
    for (let i = 0; i < 20; i++) {
      const obj: any = {
        name: this.names[Math.floor(Math.random() * this.names.length)],
        status: this.statuses[Math.floor(Math.random() * this.statuses.length)],
        date: new Date(Math.random() * (new Date().getTime() - 0) + 0).toISOString()
      };
      this.dataArray.push(obj);
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.dataArray);
    if (this.isMobileScreen()) {
      this.displayedColumns = ['name', 'date']
      console.log('Mobile screen detected.');
    }
  }
  ngOnInit(): void {
    if (this.authService.getUserRole() == 'superAdmin') {
      this.adminService.getAllAppDetails().subscribe(res => {
        if(res && res.length>0){
          let admitData = res.map((obj) => {
            return {
              Id:obj.adminId,
              name: obj.appName,
              status: obj.status,
              date: obj.createdAt
            };
          });
          this.dataSource = new MatTableDataSource(admitData);
          this.linkType='admin-details'
        }
      })
     } else {

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
  getShortName(name: any) {
    return this.authService.getShortName(name)
  }
  statusColor(stat: any) {
    let status = stat.toLowerCase();
    let displayColor: any
    switch (status) {
      case 'active':
        displayColor = 'status-green'
        break;
      case 'registered':
        displayColor = 'status-gray'
        break;
      case 'deactivated':
        displayColor = 'status-red'
        break;
      case 'pending':
        displayColor = 'status-orange'
        break;
      default:
        displayColor = ''
        break;
    }
    return displayColor
  }
  isMobileScreen(): boolean {
    const mobileScreenWidthThreshold = 768;
    return window.innerWidth < mobileScreenWidthThreshold;
  }

  navigateToDetailPage(id:any){
    if (this.authService.getUserRole() == 'superAdmin') {
       this.adminService.fetchAdminId(id);
    }

  }

}


