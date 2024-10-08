import { Component,ChangeDetectorRef  } from '@angular/core';
import { MatFormFieldModule , MatLabel } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { debounceTime,distinctUntilChanged } from 'rxjs';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ MatFormFieldModule, MatLabel, CommonModule,MatCardModule ,ReactiveFormsModule, MatInputModule , MatButtonModule , MatDividerModule ,FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  // emailExists = false;
  private emailCheckSubject = new Subject<string>();

  constructor( private fb: FormBuilder , 
    private userService:UserService ,    
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private router:Router
  ){

    this.registerForm = this.fb.group({
      email:['', [Validators.required ,Validators.email]],
      username:['',[Validators.required,Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      cpassword: ['',[Validators.required, Validators.minLength(6)]],
      mobile: ['',[Validators.required, Validators.minLength(10) , Validators.maxLength(10)]],
      country: ['',[Validators.required]]
    },{ validators: this.passwordMatchValidator }); // Attach custom validator here)



    //Debounce email check
    this.emailCheckSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(email=>{
      this.userService.checkEmail(email).subscribe((res:any)=>{

        if(res.exists){
          //custom validator to check whether the email already exists
          this.registerForm.get('email')?.setErrors({emailExists:true})
        }
        else{
          this.registerForm.get('email')?.setErrors(null)
        }

        this.cdr.detectChanges(); 
      })
    })


  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cpassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }




  //triggered on email keyup
  checkEmail():void{
    const email = this.registerForm.get('email')?.value
    if(email){
        this.emailCheckSubject.next(email) ///send email to subject
    }
  }



  onSubmit():void{
    if(this.registerForm.valid){
      console.log("form submitted", this.registerForm.value)

      let userData = {
        username:this.registerForm.value.username,
        password : this.registerForm.value.password,
        cpassword : this.registerForm.value.cpassword,
        email : this.registerForm.value.email,
        mobile : this.registerForm.value.mobile,  
        country : this.registerForm.value.country,  
      }

      this.userService.registerUser(userData).subscribe((res:any)=>{
        console.log("new user added successfully",res)
        localStorage.setItem('authtoken',res.token)
        this.router.navigate(['/home'])
      })
    }
  }
}



