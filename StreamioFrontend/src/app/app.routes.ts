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

export const routes: Routes = [
    // Redirect the empty path to 'home'
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Route with the header layout and child routes
    {
        path: '',
        component: HeaderComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'content', component: ContentComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'likedv', component: LikedVideosComponent },
            { path: 'yourv', component: YourVideosComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'report', component: ReportedComponent },
            { path: 'revenue', component: RevenueComponent },
            { path: 'playlist', component: PlaylistComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
        ]
    },

    // Example routes outside of the layout
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Wildcard route to handle undefined paths (optional)
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

