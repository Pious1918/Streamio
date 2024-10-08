import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { loadUserProfile, updateUserProfile } from '../../store/user.action';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../store/user.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe, CommonModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<any>;
  editForm!: FormGroup;
  isDisabled: boolean = true; // Initially in read-only mode
  selectedImage: string | ArrayBuffer | null = null; // To hold the selected image data
  userProfile: any; // To store the user profile data

  constructor(
    private userservice: UserService,
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private dialog:MatDialog
  ) {
    this.user$ = this.store.pipe(select(selectUser));
  }

  ngOnInit(): void {
    // this.initializeForm();
    this.loadUserData();
  }

  onEdit(id:any){
    console.log("id is s",id)
    this.openpopup(id)
  }

  loadUserData():void{
    this.store.dispatch(loadUserProfile())
    this.user$.subscribe((user:any)=>{
      console.log("user is ",user)
      this.userProfile = user.userProfile; // Store the user profile in the variable

    })
  }

  openpopup(code:any){
    this.dialog.open(PopupComponent,{
      width:'60%',
      
      data:{
        userId:this.userProfile._id,
        name:this.userProfile.name,
        // email:this.userProfile.email,
        phonenumber:this.userProfile.phonenumber,
        country:this.userProfile.country,
      }
    })
    console.log('code',code)
  }

  // initializeForm(): void {
  //   this.editForm = this.fb.group({
  //     userId: [{ value: '', disabled: false }], // Added userId control, disabled as it's read-only

  //     name: [{ value: '', disabled: false }, [Validators.required]], // Add Validators
  //     email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
  //     phonenumber: [{ value: '', disabled: false }, [Validators.required]],
  //     country: [{ value: '', disabled: false }, [Validators.required]]
  //   });
  // }


  // loadUserData(): void {
  //   this.store.dispatch(loadUserProfile());
  //   this.user$.subscribe((user: any) => {
  //     if (user && user.userProfile) {
  //       console.log("idd", user.userProfile._id)
  //       this.editForm.patchValue({
  //         userId: user.userProfile._id,
  //         name: user.userProfile.name,
  //         email: user.userProfile.email,
  //         phonenumber: user.userProfile.phonenumber,
  //         country: user.userProfile.country
  //       });
  //     }else {
  //       console.error("User or userProfile is undefined");
  //     }
  //   });
  // }









  // toggleEdit(): void {
  //   this.isDisabled = !this.isDisabled; // Toggle read-only mode
  //   if (this.isDisabled) {
  //     // If back to read-only mode, disable the fields
  //     this.editForm.disable();
  //     this.loadUserData()
  //   } else {
  //     // Enable fields when editing
  //     console.log("I am ata elas")
  //     this.editForm.enable();
  //     this.loadUserData()
  //   }
  // }


  

  // cancelEdit(): void {
  //   // Reset form values if needed
  //   this.isDisabled = true;
  //   this.loadUserData(); // Reload user data to reset changes
  // }

  // selectFile(): void {
  //   const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  //   fileInput.click();
  // }

  // onFileSelected(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   const file = target.files?.[0]; // Get the first selected file

  //   if (file) {
  //     const reader = new FileReader();
  //     // Read the image file as a data URL
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.selectedImage = reader.result; // Set the image data for preview
  //     };
  //   }
  // }

  // onupdate(): void {
  //   if (this.editForm.valid) {
  //     const updatedData = this.editForm.value;
  //     console.log("Profile updated with:", updatedData);
  
  //     // Dispatch the action to update the user profile
  //     this.store.dispatch(updateUserProfile({ user: updatedData }));
  // console.log("herearea era")
  //     // Switch back to read-only mode
     
  
  //     // Optionally reload user data to reflect the changes
  //     this.loadUserData();
  //   } else {
  //     console.error("Form is invalid");
  //   }
  // }
  




}
