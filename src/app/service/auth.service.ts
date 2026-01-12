import { response } from './../models/response';
import { Injectable } from '@angular/core';
import { user, UserDto } from '../models/user';
import { EMPTY, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl;


  //constructor and inject the HttpClient
  constructor(private http: HttpClient ){ }

  //accessing the endpoints
  //register function
  register(newUser: user): Observable<UserDto> {
    const registerUser: user = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      password: newUser.password
    }
    return this.http.post<UserDto>(`${this.url}/auth/respondent`, registerUser);
  }

  //login function
  login(email: string, password: string): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.url}/auth/login`, {email, password});
  }

  //logout
  logout(): Observable<any> {
     localStorage.removeItem('current_user'); // previous implementation
     // new implementation will use ngrx.
     return EMPTY;
  }

  //get current user
  getCurrentUser(): user | null {
    const data = localStorage.getItem('current_user');
    return data ? JSON.parse(data) : null;
  }

  //get all users
  getAllUsers(): Observable<user[]>{
    return this.http.get<user[]>(this.url)
  }
}
