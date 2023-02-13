import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUserService } from '../services/logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loggedUser: LoggedUserService,
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loggedUser.getUser() && route.routeConfig?.path?.indexOf('app') != -1){
      return true;
    }
    else if(!this.loggedUser.getUser() && route.routeConfig?.path?.indexOf('auth') != -1){
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
