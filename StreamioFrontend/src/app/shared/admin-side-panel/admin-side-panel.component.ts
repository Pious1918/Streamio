import { Component, signal } from '@angular/core';


import {MatSidenavModule} from '@angular/material/sidenav';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { Router, RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';  // Import RouterModule
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../store/user.selector';
import { Observable } from 'rxjs';



export type MenuItem={
  icon:string;
  label:string
  route?:string
}
@Component({
  selector: 'app-admin-side-panel',
  standalone: true,
  imports: [MatSidenavModule , CommonModule , MatListModule , MatIconModule ,RouterModule, AsyncPipe],
  templateUrl: './admin-side-panel.component.html',
  styleUrl: './admin-side-panel.component.css'
})
export class AdminSidePanelComponent {

  
  
  constructor(private router:Router){

    
  }

menuItems = signal<MenuItem[]>([

  {
    icon : "home",
    label:'Dashboard',
    route:'admindash'
  },
  {
    icon : "person",
    label:'Users',
    route:'userlist'
  },
  // {
  //   icon : "video_library",
  //   label:'Content',
  //   route:'content'
  // },
  // {
  //   icon : "thumb_up",
  //   label:'Liked Videos',
  //   route:'likedv'
  // },
  // {
  //   icon : "video_library",
  //   label:'Your Videos',
  //   route:'yourv'
  // },
  // {
  //   icon : "history",
  //   label:'History',
  //   route:'history'
  // },
  {
    icon : "flag",
    label:'Reported videos',
    route:'userreport'
  },
  {
    icon : "attach_money",
    label:'Revenue',
    route:'adminrevenue'
  },
  // {
  //   icon : "playlist_play",
  //   label:'Playlist',
  //   route:'playlist'
  // },
  // {
  //   icon : "subscriptions",
  //   label:'Subscriptions',
  //   route:'subscriptions'
  // }

  
])

onLogout(){

  localStorage.removeItem('authtoken')
  this.router.navigate(['/login'])
}

}
