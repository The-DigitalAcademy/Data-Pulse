import { Router } from "@angular/router";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import * as AuthActions from '../actions/auth.actions';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {
    
    constructor(
      private actions$: Actions,
      private authService: AuthService,
      private router: Router
    ) {}

    login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((User) => AuthActions.loginUserSuccess({ User })),
          catchError((error) =>
            of(AuthActions.loginUserFailure({ error: error.message || 'Login failed' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUserSuccess),
        tap(() => {
          // Navigate to home after successful login
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutUserSuccess()),
          catchError((error) =>
            of(AuthActions.logoutUserFailure({ error: error.message || 'Logout failed' }))
          )
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutUserSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // Register effects
  register$ = createEffect(
    () => this.actions$.pipe(
        ofType(AuthActions.registerUser),
        switchMap(({user}) => 
          this.authService.register(user).pipe(
            // if user successfully resgistered, login user once.
            map((user) => AuthActions.loginUserSuccess({User:user})),
            catchError((error) => 
            of(AuthActions.registerUserFailure({ error: error.message || 'User registration failed' })))
          )
        )
      )
  )

}