import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminauthguardService implements CanActivate{

  constructor(private router:Router) { }

  canActivate():boolean {
    const token = localStorage.getItem('authtoken')
    if(token){
      return true
    }else{
      this.router.navigate(['/adminlogin'])
      return false
    }
  }
}
