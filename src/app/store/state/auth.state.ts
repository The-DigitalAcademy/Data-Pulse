import { User } from "src/app/models/user";

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: Omit<User, "password">,
  isAuthenticated: boolean
}

// Initial state
export const initialAuthState : AuthState = {
    loading: false,
    error: null,
    user: {
        id: '',
        email: '',
        name: '',
        surname: '',
        role: "RESPONDENT" // Default to respondent because it has lesser privileges
    },
    isAuthenticated: false
};