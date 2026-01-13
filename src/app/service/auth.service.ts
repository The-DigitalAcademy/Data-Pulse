import { Response } from './../models/response';
import { Injectable } from '@angular/core';
import { newUserDto, User, UserDto } from '../models/user';
import { EMPTY, Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl;


  //constructor and inject the HttpClient
  constructor(private http: HttpClient ){ }

  /**
   * create new user, post request endpoint is based on the user role
   * line 32 to 36
   * @param newUser - user to create with correct role
   * @returns - userDto
   */
  register(newUser: User): Observable<User>{
    let targetUrl = '';
    const registerUser: newUserDto = {
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      password: newUser.password
    }
    if(registerUser.role === 'COORDINATOR') {
      targetUrl = `${this.url}/auth/coordinator`;
    } else {
      targetUrl = `${this.url}/auth/respondent`;
    }
    return this.http.post<User>(targetUrl, registerUser);
  }

  //login function
  login(email: string, password: string): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.url}/auth/login`, {email, password});
  }

  //logout
  logout(): Observable<any> {
     // use of operator, this will emmit value.
     // EMPTY observable doesnt (previous error.) 
     return of({ success: true });
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
