import { createReducer, on } from "@ngrx/store";
import * as SurveyAction from '../actions/survey.actions'
import { initialSurveyState } from '../state/survey.state'


export const surveyReducer = createReducer(
  initialSurveyState,
  on(SurveyAction.createSurvey, (state) => ({
    ...state,
  })),

  on(SurveyAction.loadSurvey, (state) => ({
    ...state,
    load: true,
  })),

  on(SurveyAction.loadSurveySuccess, (state, { survey }) => ({
    ...state,
    load: false,
    survey,
  }))
);