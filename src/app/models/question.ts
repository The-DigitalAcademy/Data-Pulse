import { Choice, ChoiceDto } from "./choice";

export interface Question {
  id: number;
  text: string;
  choices: ChoiceDto[];
}

export type QuestionDto = Omit<Question, 'id'>;