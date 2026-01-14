export interface Choice {
  id: number;
  text: string;
}

export type ChoiceDto = Omit<Choice, 'id'>;