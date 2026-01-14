// Load Surveys

import { createAction, props } from "@ngrx/store";
import { SurveyResponse } from "src/app/models/response";

export const loadResponses = createAction(
  '[Response] load Response',
  props<{surveyId: number}>()
);

export const loadResponsesSuccess = createAction(
  '[Response] Load Success',
  props<{surveyResponse: SurveyResponse[]}>()
);

export const loadResponsesFailure = createAction(
  '[Response] Load Responses Failure',
  props<{ error: string }>()
);

// Create the surveys

export const createResponse = createAction(
  '[Survey-fill Page] Create Response',
  props<{ surveyResponse: SurveyResponse }>()
);
export const createResponseSuccess = createAction(
  '[Response] Create Response Success',
  props<{ surveyResponse: SurveyResponse }>()
);
export const createResponseFailure = createAction(
  '[Response] Create Response Failure',
  props<{ error: string }>()
);