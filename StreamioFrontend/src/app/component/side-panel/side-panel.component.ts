import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';  // Import RouterModule

export type MenuItem={
  icon:string;
  label:string
  route?:string
}

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [HeaderComponent ,MatSidenavModule , CommonModule , MatListModule , MatIconModule ,RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  

menuItems = signal<MenuItem[]>([

  {
    icon : "home",
    label:'Home',
    route:'home'
  },
  {
    icon : "person",
    label:'Profile',
    route:'profile'
  },
  {
    icon : "video_library",
    label:'Content',
    route:'content'
  },
  {
    icon : "thumb_up",
    label:'Liked Videos',
    route:'likedv'
  },
  {
    icon : "video_library",
    label:'Your Videos',
    route:'yourv'
  },
  {
    icon : "history",
    label:'History',
    route:'history'
  },
  {
    icon : "flag",
    label:'Reported videos',
    route:'report'
  },
  {
    icon : "attach_money",
    label:'Revenue',
    route:'revenue'
  },
  {
    icon : "playlist_play",
    label:'Playlist',
    route:'playlist'
  },
  {
    icon : "subscriptions",
    label:'Subscriptions',
    route:'subscriptions'
  },
  {
    icon : "logout",
    label:'Signout',
    route:'content'
  },

  
])


}

