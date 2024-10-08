import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';  // Add FormsModule

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatInputModule, FormsModule],  // Add FormsModule
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {

  inputdata!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;  // Initialize inputdata with the provided data
  }

  closepopup() {
    this.ref.close();  // Close the dialog
  }

  updateUser(input:any) {
    // Now inputdata holds the updated values from the form
    console.log('Updated User Data:', input);
    this.ref.close(this.inputdata);  // Pass the updated data back when closing
  }
}
