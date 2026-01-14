import { CanActivateFn, Router } from '@angular/router';
import { take, map } from "rxjs";
import * as AuthSelector from '../../app/store/selectors/auth.selector';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';

export const restrictingGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(AuthSelector.selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      // If authenticated, redirect to home (don't allow access to login/register)
      if (isAuthenticated) {
        router.navigate(['/home']);
        return false;
      }
      // If NOT authenticated, allow access to login/register
      return true;
    })
  );
};