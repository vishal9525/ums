import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  breadcrumbs:any=[
    {
      id: 1,
      name: 'Dashboard',
      routerLink: '',
      active:false
    }
 ] 
/*  breadcrumbs:any=[
  {
    id: 1,
    name: 'Dashboard',
    routerLink: '',
    active:true
  },
  {
    id: 2,
    name: 'Edit',
    routerLink: '',
    active:false
  }] */
 FRUITS: any= [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
 NAMES: any= [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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

  /** Builds and returns a new User. */
  createNewUser(id: number) {
  const name =
    this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))] +
    ' ' +
    this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: this.FRUITS[Math.round(Math.random() * (this.FRUITS.length - 1))],
  };
} 
}


