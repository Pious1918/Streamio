import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Add FormsModule
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateUserProfile } from '../../store/user.action';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatInputModule, FormsModule,ReactiveFormsModule,CommonModule],  // Add FormsModule
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {

  inputdata!: any;
  inputForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private formBuilder: FormBuilder,  // Inject FormBuilder
    private store: Store
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      userId:[this.data.userId],
      profilepic:[this.data.profilepic],
      name: [this.data.name, [Validators.required]],  // Name is required
      phonenumber: [this.data.phonenumber, [Validators.required, Validators.pattern('^[0-9]*$')]], // Required and must be numeric
      country: [this.data.country, [Validators.required]], // Country is required
    });
  }

  closepopup() {
    this.ref.close(this.inputForm.value);  // Close the dialog
  }
  url='assets/avathar.jpg'
  onSelectFile(e:any){
    if(e.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
    
      reader.onload=(event:any)=>{
        this.url =event.target.result
        this.inputForm.patchValue({ profilepic: this.url }); // Update the form with the base64 image

      }
      // reader.readAsDataURL(file); // Convert file to base64
    }
  }

  updateUser() {
    if (this.inputForm.valid) {

      const update = this.inputForm.value
      console.log("updated values",update)
      
     
      this.ref.close(this.inputForm.value); // Pass the updated data back when closing

    } else {
      console.log('Form is invalid');
      // You can also show an error message here
    }
  }
}
