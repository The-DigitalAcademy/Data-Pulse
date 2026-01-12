import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { user } from 'src/app/models/user';
import * as UserActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  newUser : user = {
    id: '',
    name: '',
    surname: '',
    role: 'coordinator',
    email: '',
    password: ''
  }
  loading =false;
  success = false;
  error = '';

  constructor(
    private store: Store
  ){}

  register() {
    console.log(this.newUser)
    if(!this.newUser.name || !this.newUser.surname || !this.newUser.email || !this.newUser.password)
      throwError(() => new Error("Fields are invalid"));

    this.store.dispatch(UserActions.registerUser({ newuser : this.newUser}));

  }
}
