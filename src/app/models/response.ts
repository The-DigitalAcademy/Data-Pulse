export interface Response {
  id: number;
  surveyId: number;
  userId: string;
  answers: { questionId: number; choiceId: number }[];
  submittedAt: string;
}