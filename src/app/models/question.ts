import { Choice, ChoiceDto } from "./choice";

export interface Question {
  id: number;
  text: string;
  choiceOptions: ChoiceDto[];
}

export type QuestionDto = Omit<Question, 'id'>;