import { createAction, props } from '@ngrx/store';
import { survey } from 'src/app/models/survey';

export const createSurvey = createAction(
  '[Survey Page] Create Survey',
  props<{ survey: survey}>()
);

export const loadSurvey = createAction(
  '[Survey Page] load Survey',
);

export const loadSurveySuccess = createAction(
  '[Survey Page] Load Success',
  props<{survey: survey[]}>()
);