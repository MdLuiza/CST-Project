import { Injectable } from '@angular/core';
import { User } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  loggedUser?: User = undefined;

  constructor() { }

  setUser(user: User){
    this.loggedUser = user;
  }

  getUser(){
    return this.loggedUser;
  }
}
