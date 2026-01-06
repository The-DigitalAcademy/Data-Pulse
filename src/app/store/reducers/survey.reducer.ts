import { createReducer, on } from "@ngrx/store";
import * as SurveyActions from '../actions/survey.actions'
import { initialSurveyState } from '../state/survey.state'

export const surveysFeatureKey = 'surveys';

export const surveyReducer = createReducer(
  initialSurveyState,

  // Load Surveys
  on(SurveyActions.loadSurveys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SurveyActions.loadSurveysSuccess, (state, { surveys }) => ({
    ...state,
    surveys: surveys,
    loading: false,
  })),
  on(SurveyActions.loadSurveysFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Single Survey
  on(SurveyActions.loadSurvey, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SurveyActions.loadSurveySuccess, (state, { survey }) => {
    const existingIndex = state.surveys.findIndex(s => s.id === survey.id);
    const updatedSurveys = existingIndex >= 0
      ? state.surveys.map(s => s.id === survey.id ? survey : s)
      : [...state.surveys, survey];
    
    return {
      ...state,
      surveys: updatedSurveys,
      loading: false,
    };
  }),
  on(SurveyActions.loadSurveyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Survey
  on(SurveyActions.createSurvey, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SurveyActions.createSurveySuccess, (state, { survey }) => ({
    ...state,
    surveys: [...state.surveys, survey],
    loading: false,
  })),
  on(SurveyActions.createSurveyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Survey
  on(SurveyActions.updateSurvey, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SurveyActions.updateSurveySuccess, (state, { survey }) => ({
    ...state,
    surveys: state.surveys.map(s => 
      s.id === survey.id ? survey : s
    ),
    loading: false,
  })),
  on(SurveyActions.updateSurveyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Survey
  on(SurveyActions.deleteSurvey, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SurveyActions.deleteSurveySuccess, (state, { id }) => ({
    ...state,
    surveys: state.surveys.filter(s => s.id !== id),
    loading: false,
    selectedSurveyId: state.selectedSurveyId === id ? null : state.selectedSurveyId,
  })),
  on(SurveyActions.deleteSurveyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Open Survey
  on(SurveyActions.openSurvey, (state, { id }) => ({
    ...state,
    surveys: state.surveys.map(s =>
      s.id === id
        ? { ...s, isOpen: true, openedAt: new Date().toISOString() }
        : s
    ),
  })),

  // Close Survey
  on(SurveyActions.closeSurvey, (state, { id }) => ({
    ...state,
    surveys: state.surveys.map(s =>
      s.id === id
        ? { ...s, isOpen: false, closedAt: new Date().toISOString() }
        : s
    ),
  })),

  // Select Survey
  on(SurveyActions.selectSurvey, (state, { id }) => ({
    ...state,
    selectedSurveyId: id,
  }))
);