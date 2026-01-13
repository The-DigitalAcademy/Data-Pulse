import { Question } from "./question";
import { User } from "./user";

export interface Survey {
    id: number;
    title: string;
    desc: string;
    coordinator: User;
    questions: Question[];
    isOpen: boolean;
    createdAt: string;
    openedAt?: string;
    closedAt?: string;
}