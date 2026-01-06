import { survey } from "src/app/models/survey";

export interface SurveyState {
  
  selectedSurveyId: number | null;
  loading: boolean;
  error: string | null;
  editingSurvey: survey | null;
    // questions: [],
  surveys: survey[]
}

// Initial state
export const initialSurveyState : SurveyState = {
    selectedSurveyId: null,
    loading: false,
    error: null,
    editingSurvey: null,
    surveys: []
};
