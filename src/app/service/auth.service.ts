import { Response } from './../models/response';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { EMPTY, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //constructor and inject the HttpClient
  constructor(private readonly http: HttpClient ){ }

  //accessing the endpoints
  private readonly url = '/api/users';
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
  login(email: string, password: string): Observable<User> {
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        const foundUser = users.find((user) => user.email === email && user.password === password) ?? null;
        if (!foundUser) {
          throw new Error('User does not exist');
        }
        localStorage.setItem('current_user', JSON.stringify(foundUser));
        return foundUser;
      })
    );
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
