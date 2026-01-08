import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { take, map } from "rxjs";
import { AuthService } from "../service/auth.service";
import * as AuthSelector from '../../app/store/selectors/auth.selector';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService );
  const router = inject(Router);
const store = inject (Store);

return store.select (AuthSelector.selectIsAuthenticated).pipe(

    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
  );
};