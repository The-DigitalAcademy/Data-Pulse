import { Injectable } from '@angular/core';
import { SurveyService } from 'src/app/service/survey.service';
import * as SurveyActions from '../actions/survey.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';
import { Survey } from 'src/app/models/survey';

@Injectable()
export class SurveyEffects {

  constructor(
    private actions$: Actions,
    private surveyService: SurveyService
  ) {}

  loadSurveys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.loadSurveys),
      switchMap(() =>
        this.surveyService.getAll().pipe(
          map((surveys) => SurveyActions.loadSurveysSuccess({ surveys })),
          catchError((error) =>
            of(SurveyActions.loadSurveysFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.createSurvey),
      switchMap(({ survey }) =>
        this.surveyService.createSurvey(survey).pipe(
          map((newSurvey) =>
            SurveyActions.createSurveySuccess({ survey: newSurvey })
          ),
          catchError((error) =>
            of(SurveyActions.createSurveyFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.updateSurvey),
      switchMap(({ id, changes }) => {
        const survey: Survey = {
          id: id,
          title: changes.title!,
          desc: changes.desc!,
          questions: changes.questions!,
          isOpen: changes.isOpen!,
          createdAt: changes.createdAt!,
          openedAt: changes.openedAt,
          closedAt: changes.closedAt,
        };
        return this.surveyService.updateSurvey(survey).pipe(
          map((updatedSurvey) =>
            SurveyActions.updateSurveySuccess({ survey: updatedSurvey })
          ),
          catchError((error) =>
            of(SurveyActions.updateSurveyFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deleteSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.deleteSurvey),
      mergeMap(({ id }) =>
        this.surveyService.delete(id).pipe(
          map(() => SurveyActions.deleteSurveySuccess({ id })),
          catchError((error) =>
            of(SurveyActions.deleteSurveyFailure({ error: error.message }))
          )
        )
      )
    )
  );

}
