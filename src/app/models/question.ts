import { Choice, ChoiceDto } from "./choice";

export interface Question {
  id: number;
  text: string;
  choiceOptions: ChoiceDto[];
}

export interface QuestionDto {
  id?: number;
  text: string;
  choiceOptions: ChoiceDto[];
}