import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResponseState } from '../state/response.state'
import { SurveyResponse } from 'src/app/models/response';
// Feature key (must match what you used in StoreModule)
export const selectResponseState = createFeatureSelector<ResponseState>('response')

// Get all survey responses
export const selectAllResponses = createSelector(
  selectResponseState,
  (state: ResponseState) => state.response
);

export const selectResponsesBySurveyId = (surveyId: number) =>
  createSelector(
    selectAllResponses,
    (responses: SurveyResponse[]) =>
      responses.filter(response => response.surveyId === surveyId)
  );
  
// Get loading status
export const selectResponsesLoading = createSelector(
  selectResponseState,
  (state: ResponseState) => state.loading
);

// Get error
export const selectResponsesError = createSelector(
  selectResponseState,
  (state: ResponseState) => state.error
);