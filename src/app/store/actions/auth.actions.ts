import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

export const loginUser = createAction(
    "[Auth API] login ",
    props<{email: string, password: string}>()
);

export const loginUserSuccess = createAction(
    "[Auth API]  login success",
    props<{User: Omit<User, 'password'>}>()
);

export const loginUserFailure = createAction(
    "[Auth API]  login failure",
    props<{error: any}>()
);

// register actions
export const registerUser = createAction(
    "[Auth API] login ",
    props<{user: User}>()
);

export const registerUserSuccess = createAction(
    "[Auth API]  register success",
    props<{user: Omit<User, 'password'>}>()
);

export const registerUserFailure = createAction(
    "[Auth API]  register failure",
    props<{error: any}>()
);

export const logoutUser = createAction(
    "[Auth API] logging user out."
);

export const logoutUserSuccess = createAction(
    "[Auth API]  logout success"
);

export const logoutUserFailure = createAction(
    "[Auth API]  logout failure",
    props<{error: any}>()
);