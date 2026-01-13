import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSurvey from '../reducers/survey.reducer';
import { SurveyState } from '../state/survey.state';

export const selectSurveyState = createFeatureSelector<SurveyState>(fromSurvey.surveysFeatureKey)

export const selectAllSurveys = createSelector(
    selectSurveyState,
    (state) => state.surveys
);

// Select survey by ID
export const selectSurveyById = (id: number) => createSelector(selectSurveyState, (entities) => entities.surveys[id]);

// Select open Surveys
export const selectOpenSurveys = createSelector(selectAllSurveys, (surveys) =>
    surveys.filter((survey) => survey.isOpen)
);

// Select closed surveys
export const selectClosedSurveys = createSelector(selectAllSurveys, (surveys) =>
  surveys.filter((survey) => !survey.isOpen)
);

// Selectors for making rsponsive ui
export const selectSurveyLoading = createSelector(
  selectSurveyState,
  (state) => state.loading
);

export const selectSurveyError = createSelector(
  selectSurveyState,
  (state) => state.error
);

export const selectSelectedSurveyId = createSelector(
  selectSurveyState,
  (state) => state.selectedSurveyId
);