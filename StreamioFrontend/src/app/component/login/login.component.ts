import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField , MatLabel, MatCardModule ,ReactiveFormsModule, MatInputModule , MatButtonModule , MatDividerModule ,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
