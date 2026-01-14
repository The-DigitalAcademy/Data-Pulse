import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSurvey from '../reducers/survey.reducer';
import { SurveyState } from '../state/survey.state';
import { selectCurrentUser, selectUserId } from './auth.selector';
import { UrlSerializer } from '@angular/router';
export const selectSurveyState = createFeatureSelector<SurveyState>(fromSurvey.surveysFeatureKey)

export const selectAllSurveys = createSelector(
    selectSurveyState,
    (state) => state.surveys
);

// Select survey by ID
export const selectSurveyById = (id: number) => createSelector(selectSurveyState, (entities) => entities.surveys.filter(survey => survey.id == id)[0]);

// Select open Surveys
export const selectOpenSurveys = createSelector(selectAllSurveys, (surveys) =>
    surveys.filter((survey) => survey.isOpen)
);

//Select survey by user id
export const SelectSurveyByUserId = () => createSelector(
   selectAllSurveys,
   selectUserId,
   (surveys, id) => surveys.filter((survey) => survey.coordinator?.id === id))

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