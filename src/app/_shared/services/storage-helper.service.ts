import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {

  constructor(private cookieService: CookieService) { }

  setRememberMe(username: string){
    this.cookieService.set('rememberMe', username);
  }

  getRememberMe(){
    return this.cookieService.get('rememberMe');
  }
}
