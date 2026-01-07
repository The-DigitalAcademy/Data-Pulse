import { user } from "src/app/models/user";

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: Omit<user, "password">
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
        role: "respondent" // Default to respondent because it has lesser privileges
    }
};