import { Question } from "./question";
import { User } from "./user";

export interface Survey {
length: any;
    id: number;
    title: string;
    desc: string;
    coordinator: User
    questions: Question[];
    response: Response[];
    isOpen: boolean;
    createdAt: string;
    openedAt?: string;
    closedAt?: string;
}

export type newSurvey = Omit<Survey, 'id' | 'createdAt'>;