import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { initialAuthState } from '../state/auth.state';

export const authFeatureKey = 'userAuth';

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.loginUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: null,
    user: user,
    isAuthenticated: true,
  })),
  on(AuthActions.loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    user: initialAuthState.user,
    isAuthenticated: false,
  })),

  // Logout
  on(AuthActions.logoutUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.logoutUserSuccess, (state) => ({
    ...initialAuthState,
  })),
  on(AuthActions.logoutUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);