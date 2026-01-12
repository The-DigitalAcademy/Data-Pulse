import { createAction, props } from "@ngrx/store";
import { user } from "src/app/models/user";

export const loginUser = createAction(
    "[Auth API] login ",
    props<{email: string, password: string}>()
);

export const loginUserSuccess = createAction(
    "[Auth API]  login success",
    props<{user: Omit<user, 'password'>}>()
);

export const loginUserFailure = createAction(
    "[Auth API]  login failure",
    props<{error: any}>()
);

// register actions
export const registerUser = createAction(
    "[Auth API] login ",
    props<{user: user}>()
);

export const registerUserSuccess = createAction(
    "[Auth API]  register success",
    props<{user: Omit<user, 'password'>}>()
);

export const registerUserFailure = createAction(
    "[Auth API]  register failure",
    props<{error: any}>()
);

export const logoutUser = createAction(
    "[Auth API] "
);

export const logoutUserSuccess = createAction(
    "[Auth API]  logout success"
);

export const logoutUserFailure = createAction(
    "[Auth API]  ",
    props<{error: any}>()
);