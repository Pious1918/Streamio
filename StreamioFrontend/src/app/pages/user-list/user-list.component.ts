import { Component, ViewChild } from '@angular/core';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface UserData {
  slNo: string;
  ProfileImage: string;
  Name: string;
  Subscribers: string;
  Status: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule ,MatPaginator,MatPaginatorModule,MatSort,MatSortModule,MatInputModule,MatFormFieldModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  displayedColumns: string[] = ['slNo', 'profileImage', 'name', 'subscribers', 'status'];
  dataSource!: MatTableDataSource<UserData>;
  // Sample data for demonstration
  users: UserData[] = [
    { slNo: '1', ProfileImage: 'path/to/image1.jpg', Name: 'John Doe', Subscribers: '500', Status: 'Active' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    { slNo: '2', ProfileImage: 'path/to/image2.jpg', Name: 'Jane Smith', Subscribers: '1200', Status: 'Inactive' },
    // Add more users as needed
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
