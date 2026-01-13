import { Question } from "./question";

export interface Survey {
    id: number;
    title: string;
    desc: string;
    questions: Question[];
    isOpen: boolean;
    createdAt: string;
    openedAt?: string;
    closedAt?: string;
}

export type newSurvey = Omit<Survey, 'id' | 'createdAt'>;