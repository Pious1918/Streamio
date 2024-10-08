import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserProfile } from '../../store/user.action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{




  constructor(private userservice:UserService , private router:Router, private store:Store){}


  ngOnInit(): void {
    
  }



}
