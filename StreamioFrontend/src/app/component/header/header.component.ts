import { Component, computed, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { MatDrawer } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ContentComponent } from '../../pages/content/content.component';
import { HomeComponent } from '../../pages/home/home.component';
import {  Router, RouterOutlet } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidePanelComponent,CommonModule,FormsModule , MatSidenavModule ,MatToolbarModule , MatButtonModule,MatFormField ,MatLabel, MatIconModule ,ContentComponent ,HomeComponent,RouterOutlet ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  collapsed = signal(true)
  // sidenavWidth = computed(()=> this.collapsed()? `0px` :`250px`)
  

  sidenavWidth = computed(() => {
    const isSmallScreen = window.innerWidth < 768; // Define small screen size
    if (isSmallScreen) {
      return this.collapsed() ? `0px` : `70px`; // Fully close on collapse, open to 70px if expanded
    } else {
      return this.collapsed() ? `0px` : `250px`; // For larger screens, collapse fully or open to 250px
    }
  });

  searchTerm: string = '';


  constructor(private router: Router) {}

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/results'], { queryParams: { query: this.searchTerm } });
    }
  }

}
