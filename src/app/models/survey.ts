import { Question, QuestionDto } from "./question";
import { SurveyResponse } from "./response";
import { User, UserDto } from "./user";

export interface Survey {
    id: number;
    title: string;
    desc: string;
    coordinator?: UserDto;
    questions?: Question[];
    surveyResponse?: SurveyResponse[];
    isOpen: boolean;
    createdAt: string;
    openedAt?: string;
    closedAt?: string;
}

export type newSurvey = Omit<Survey, 'id' | 'createdAt'>;

export interface newSurveyDto {
    title: string;
    desc: string;
    coordinator?: UserDto;
    questions: QuestionDto[];
    isOpen: boolean;
    openedAt?: string;
    closedAt?: string;
}