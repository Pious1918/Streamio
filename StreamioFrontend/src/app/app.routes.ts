import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './pages/home/home.component';


import { ContentComponent } from './pages/content/content.component';
import { HeaderComponent } from './component/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LikedVideosComponent } from './pages/liked-videos/liked-videos.component';
import { YourVideosComponent } from './pages/your-videos/your-videos.component';
import { HistoryComponent } from './pages/history/history.component';
import { ReportedComponent } from './pages/reported/reported.component';
import { RevenueComponent } from './pages/revenue/revenue.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { AuthService } from './service/auth.service';
import { AdminDashComponent } from './pages/admin-dash/admin-dash.component';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AdminReportsComponent } from './pages/admin-reports/admin-reports.component';
import { AdminRevenueComponent } from './pages/admin-revenue/admin-revenue.component';
import { AdminRegisterComponent } from './component/admin-register/admin-register.component';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { AdminauthguardService } from './service/adminauthguard.service';
import { ResultsComponent } from './pages/results/results.component';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
    // User routes with the header layout and child routes
    {
      path: '',
      component: HeaderComponent,
      canActivate: [AuthService], // Optional guard for all user routes
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'content', component: ContentComponent, canActivate: [AuthService] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthService] },
        { path: 'likedv', component: LikedVideosComponent, canActivate: [AuthService] },
        { path: 'yourv', component: YourVideosComponent, canActivate: [AuthService] },
        { path: 'history', component: HistoryComponent, canActivate: [AuthService] },
        { path: 'report', component: ReportedComponent, canActivate: [AuthService] },
        { path: 'revenue', component: RevenueComponent, canActivate: [AuthService] },
        { path: 'playlist', component: PlaylistComponent, canActivate: [AuthService] },
        { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [AuthService] },
        { path: 'results', component: ResultsComponent, canActivate: [AuthService] },
      ]
    },
    
    
    // Login and Register routes (outside the layout)
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  ];
  
  export const adminRoutes: Routes = [
    // Admin routes with the admin layout
    {
      path: 'admin',
      component: AdminHeaderComponent,
      canActivate:[AdminauthguardService],
  // Optional guard for admin authentication
      children: [
        { path: 'admindash', component: AdminDashComponent },
        { path: 'userlist', component: UserListComponent },
        { path: 'userreport', component: AdminReportsComponent },
        { path: 'adminrevenue', component: AdminRevenueComponent },
      ]
    },
  
    // Admin login route (outside the layout)
    { path: 'adminlogin', component: AdminPanelComponent },
    { path: 'adminregister', component: AdminRegisterComponent },
  ];
  
  // Main Routes that include both user and admin routes
  export const routes: Routes = [
    ...userRoutes, // Include user routes
    ...adminRoutes, // Include admin routes
  
    // Wildcard route to handle undefined paths (optional)
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
  ];
  
