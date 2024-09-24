import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [


    {path:"",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"home",component:HomeComponent},
];
