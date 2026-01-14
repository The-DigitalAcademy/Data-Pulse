export interface Response {
  id: number;
  surveyId: number;
  userId: string;
  answers: { questionId: number; choiceId: number }[];
  submittedAt: string;
}

export interface ResponseDto {
  surveyId: number;
  userId: string;
  answers: { questionId: number; choiceId: number }[];
  submittedAt: string;
}