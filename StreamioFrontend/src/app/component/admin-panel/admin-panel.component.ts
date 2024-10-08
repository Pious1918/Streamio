import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatFormField , MatLabel, MatCardModule ,ReactiveFormsModule, MatInputModule , MatButtonModule , MatDividerModule ,FormsModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  loginForm!:FormGroup

  constructor(private fb:FormBuilder , private router:Router , private adminservice:AdminService){

    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }


  onSubmit(){
   
    if(this.loginForm.valid){
      const adminData={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }

      console.log(adminData)
      this.adminservice.loginAdmin(adminData).subscribe((res:any)=>{
        console.log("admin Login successfully",res)
        localStorage.setItem('authtoken',res.token)
        this.router.navigate(['/admin/admindash'])
      })
    }
  }
}
