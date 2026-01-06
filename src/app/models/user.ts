export interface user {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: 'coordinator' | 'respondent';
    password: string;
}
