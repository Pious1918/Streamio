import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { MatDrawer } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ContentComponent } from '../../pages/content/content.component';
import { HomeComponent } from '../../pages/home/home.component';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidePanelComponent , MatSidenavModule ,MatToolbarModule , MatButtonModule , MatIconModule ,ContentComponent ,HomeComponent,RouterOutlet ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  collapsed = signal(true)
  sidenavWidth = computed(()=> this.collapsed()? `0px` :`250px`)
}
