import { createReducer, on } from "@ngrx/store";
import { initialResponseState } from "../state/response.state";
import * as ResponseActions from '../actions/response.actions'

export const responseReducer = createReducer(
  initialResponseState,

on(ResponseActions.loadResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
   on(ResponseActions.loadResponsesSuccess, (state, { surveyResponse }) => ({
    ...state,
    response: surveyResponse, // replace state array with API array
    loading: false,
    error: null
  })),
    
  on(ResponseActions.loadResponsesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),


    // Create Survey
    on(ResponseActions.createResponse, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(ResponseActions.createResponseSuccess, (state, { surveyResponse }) => ({
      ...state,
      response: [...state.response, surveyResponse],
      loading: false,
    })),
    on(ResponseActions.createResponseFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

)