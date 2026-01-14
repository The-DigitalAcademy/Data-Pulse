export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: 'COORDINATOR' | 'RESPONDENT';
    password: string
}

export type UserDto = Omit<User, 'password'>;
export type newUserDto = Omit<User, 'id'>;
