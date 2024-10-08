
import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';

import { MatDrawer } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ContentComponent } from '../../pages/content/content.component';
import { HomeComponent } from '../../pages/home/home.component';
import {  RouterOutlet } from '@angular/router';
import { AdminSidePanelComponent } from '../admin-side-panel/admin-side-panel.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [AdminSidePanelComponent,  MatSidenavModule ,MatToolbarModule , MatButtonModule , MatIconModule ,ContentComponent ,HomeComponent,RouterOutlet ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
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
}
