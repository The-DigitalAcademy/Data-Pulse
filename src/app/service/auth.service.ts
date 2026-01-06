import { response } from './../models/response';
import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, map } from 'rxjs';
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
  register(newUser: user): Observable<user>{
    const registerUser: user = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      role: newUser.role,
      password: newUser.password
    }

    return this.http.post<user>(this.url, registerUser);
  }

  //login function
  login(email: string, password: string): Observable<user> {
    return this.getAllUsers().pipe(
      map((users: user[]) => {
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
  logout(): void{
     localStorage.removeItem('current_user');
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
