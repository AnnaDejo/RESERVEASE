import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'username': username });
    return this.http.get<any>('/api/user_data', { headers });
  }
}