import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { Router, RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router';  // Import RouterModule
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../store/user.selector';
import { Observable } from 'rxjs';
import { ResultsComponent } from '../../pages/results/results.component';

export type MenuItem={
  icon:string;
  label:string
  route?:string
}

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [HeaderComponent ,MatSidenavModule , CommonModule , MatListModule , MatIconModule ,RouterModule, AsyncPipe,ResultsComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  
  user$!:Observable<any>
  constructor(private router:Router ,private store:Store){

    this.user$ = this.store.pipe(select(selectUser))
  }

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
  }

  
])
searchQuery: string = '';
  searchResults: any[] = [];
onLogout(){

  localStorage.removeItem('authtoken')
  this.router.navigate(['/login'])
}
onSearch(query: string) {
  this.searchQuery = query;
  // Simulate search results
  this.searchResults = [
    { id: 1, title: 'Result 1 for ' + query },
    { id: 2, title: 'Result 2 for ' + query },
    { id: 3, title: 'Result 3 for ' + query },
  ];
}
}

