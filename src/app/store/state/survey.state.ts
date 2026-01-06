import { survey } from "src/app/models/survey";

export interface SurveyState {
  
  selectedSurveyId: string | null;
  loading: boolean;
  error: string | null;
  editingSurvey: survey | null;
    // questions: [],
    survey: survey[]
}

// Initial state
export const initialSurveyState : SurveyState = {
    selectedSurveyId: null,
    loading: false,
    error: null,
    editingSurvey: null,
    survey: []
};
