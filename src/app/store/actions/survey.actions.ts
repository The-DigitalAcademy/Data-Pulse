import { createAction, props } from '@ngrx/store';
import { Survey } from 'src/app/models/survey';

export const createSurvey = createAction(
  '[Survey Page] Create Survey',
  props<{ survey: Omit<Survey, 'id' | 'createdAt'> }>()
);

export const loadSurveys = createAction(
  '[Survey Page] load Survey',
);

export const loadSurveysSuccess = createAction(
  '[Survey Page] Load Success',
  props<{surveys: Survey[]}>()
);

export const loadSurveysFailure = createAction(
  '[Survey] Load Surveys Failure',
  props<{ error: string }>()
);

// Load Single Survey
export const loadSurvey = createAction(
  '[Survey] Load Survey',
  props<{ id: number }>()
);
export const loadSurveySuccess = createAction(
  '[Survey] Load Survey Success',
  props<{ survey: Survey }>()
);
export const loadSurveyFailure = createAction(
  '[Survey] Load Survey Failure',
  props<{ error: string }>()
);

export const createSurveySuccess = createAction(
  '[Survey] Create Survey Success',
  props<{ survey: Survey }>()
);
export const createSurveyFailure = createAction(
  '[Survey] Create Survey Failure',
  props<{ error: string }>()
);

// LoadSurveyById 
export const loadSelectSurveyById = createAction(
  '[Survey] Load Survey Success',
  props<{ survey: Survey }>()

)

// Update Survey
export const updateSurvey = createAction(
  '[Survey] Update Survey',
  props<{ id: number; changes: Partial<Survey> }>()
);
export const updateSurveySuccess = createAction(
  '[Survey] Update Survey Success',
  props<{ survey: Survey }>()
);
export const updateSurveyFailure = createAction(
  '[Survey] Update Survey Failure',
  props<{ error: string }>()
);

// Delete Survey
export const deleteSurvey = createAction(
  '[Survey] Delete Survey',
  props<{ id: number }>()
);
export const deleteSurveySuccess = createAction(
  '[Survey] Delete Survey Success',
  props<{ id: number }>()
);
export const deleteSurveyFailure = createAction(
  '[Survey] Delete Survey Failure',
  props<{ error: string }>()
);

// Open Survey
export const openSurvey = createAction(
  '[Survey] Open Survey',
  props<{ id: number }>()
);
// Close Survey
export const closeSurvey = createAction(
  '[Survey] Close Survey',
  props<{ id: number }>()
);

// Select Survey
export const selectSurvey = createAction(
  '[Survey] Select Survey',
  props<{ id: number | null }>()
);