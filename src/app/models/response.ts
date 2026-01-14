export interface Response {
  id?: number;
  survey?: any;
  respondent?: any;
  answers: { questionId: number; choiceId: number }[];
  submittedAt: string;
}

export interface ResponseDto {
  surveyId: number;
  userId: string;
  answers: { questionId: number; choiceId: number }[];
  submittedAt: string;
}