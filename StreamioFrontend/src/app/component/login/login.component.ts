import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField , MatLabel, MatCardModule ,ReactiveFormsModule, MatInputModule , MatButtonModule , MatDividerModule ,FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!:FormGroup

  constructor(private fb:FormBuilder , private router:Router , private userservice:UserService){

    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }


  onSubmit(){
   
    if(this.loginForm.valid){
      const userdata={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }

      console.log(userdata)
      this.userservice.loginUser(userdata).subscribe((res:any)=>{
        console.log("Login successfully",res)
        localStorage.setItem('authtoken',res.token)
        this.router.navigate(['/home'])
      })
    }
  }
}
