import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [AdminHeaderComponent,CommonModule],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})


export class AdminDashComponent implements OnInit{


  userList:any[]=[]
  constructor(private adminservice:AdminService){}

  ngOnInit(): void {
    this.loadAdmin();
  }


  loadAdmin(){
    this.adminservice.loadAdmindash().subscribe((res:any)=>{
      console.log(res.users)
      this.userList= res.users
  
    })
  }

  toggleStatus(){
    
  }



}
