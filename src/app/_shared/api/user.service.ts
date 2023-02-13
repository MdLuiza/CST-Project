import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getUserById(id: number){
    return this.httpClient.get<User[]>(`${this.apiUrl}?id=${id}`);
  }

  getUserByEmail(email: string){
    return this.httpClient.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  getUserByEmailAndPassword(email: string, password: string){
    return this.httpClient.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  register(user: User){
    return this.httpClient.post(`${this.apiUrl}`, user);
  }
}
