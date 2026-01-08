import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../state/auth.state";
import * as fromAuth from '../reducers/auth.reducers'

export const selectAuthState = createFeatureSelector<AuthState>(fromAuth.authFeatureKey);

// User data selector
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.user
);

// --
// User detail selectors
export const selectUserId = createSelector(
  selectCurrentUser,
  (user) => user?.id || null
);

export const selectUserEmail = createSelector(
  selectCurrentUser,
  (user) => user?.email || null
);

export const selectUserName = createSelector(
  selectCurrentUser,
  (user) => user?.name || null
);

export const selectUserSurname = createSelector(
  selectCurrentUser,
  (user) => user?.surname || null
);

export const selectUserFullName = createSelector(
  selectCurrentUser,
  (user) => user ? `${user.name} ${user.surname}` : null
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role || null
);

// Role-based selectors
export const selectIsRespondent = createSelector(
  selectUserRole,
  (role) => role === 'respondent'
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === 'coordinator'
);