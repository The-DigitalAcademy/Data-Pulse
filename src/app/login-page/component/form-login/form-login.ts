import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  styleUrls: ['./form-login.css']
})
export class FormLogin {
  email: string = '';
  password: string = ''
  loading = false;
  success = false;
  error = '';

  constructor(
    private store: Store
  ) {}

  login() {
    console.log(this.email, this.password);
    if(!this.email || !this.password)
      throwError(() => new Error('Information entered is incorrect'));

    this.store.dispatch(UserActions.loginUser({email:this.email, password:this.password}));

  }
}
