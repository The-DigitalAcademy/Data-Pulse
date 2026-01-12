import { Response } from './../models/response';
import { Injectable } from '@angular/core';
import { User, UserDto } from '../models/user';
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
  register(newUser: User): Observable<User>{
    const registerUser: User = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      password: newUser.password
    }

    return this.http.post<User>(this.url, registerUser);
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
  getCurrentUser(): User | null {
    const data = localStorage.getItem('current_user');
    return data ? JSON.parse(data) : null;
  }

  //get all users
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }
}
