import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts'

  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(this.apiUrl);
  }

  getPostsByUserId(userId: number){
    return this.httpClient.get(`${this.apiUrl}?userId=${userId}`);
  }

  getPostById(id: number){
    return this.httpClient.get(`${this.apiUrl}?id=${id}`);
  }

  getFinishedOrUnfinishedPosts(userId: number, isFinished: boolean){
    return this.httpClient.get(`${this.apiUrl}?userId=${userId}&isFinished=${isFinished}`);
  }
}
