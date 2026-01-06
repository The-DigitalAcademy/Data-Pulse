import { question } from "./question";

export interface survey{
    id: number;
    title: string;
    desc: string;
    questions: question[];
    isOpen: boolean;
    createdAt: string;
    openedAt?: string;
    closedAt?: string;
}