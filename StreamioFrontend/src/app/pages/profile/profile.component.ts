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
    this.store.dispatch(loadUserProfile());

    this.user$.subscribe((user:any)=>{
      if(user && user.updatedProfile) {
        this.userProfile = user.updatedProfile; // Store the user profile in the variable
      }else{
        this.userProfile = user.userProfile; // Store the user profile in the variable
      }
      console.log("user is ",user)

    })
  }
  
  onEdit(id:any){
    console.log("id is s",id)
    this.openpopup(id)
  }

  openpopup(code:any){
    this.dialog.open(PopupComponent,{
      width:'60%',
      
      data:{
        userId:this.userProfile._id,
        name:this.userProfile.name,
        profilepic:this.userProfile.profilepicture,
        phonenumber:this.userProfile.phonenumber,
        country:this.userProfile.country,
      }
    }).afterClosed().subscribe(updatedProfile=>{
      this.store.dispatch(updateUserProfile({user:updatedProfile}))
      console.log("updateted ",updateUserProfile)
    })
    console.log('code',code)
  }











  






}
