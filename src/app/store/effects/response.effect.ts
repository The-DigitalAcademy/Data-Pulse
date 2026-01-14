import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ResponseService } from "src/app/service/response.service";
import * as ResponseActions from '../actions/response.actions';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';

@Injectable()
export class ResponseEffects {

  constructor(
    private actions$: Actions,
    private responseService: ResponseService
  ) {}

  loadResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResponseActions.loadResponses),
      switchMap((action) =>
         this.responseService.getBySurveyId(action.surveyId).pipe(
          map((SurveyResponse) => ResponseActions.loadResponsesSuccess({ SurveyResponse })),
          catchError((error) =>
            of(ResponseActions.loadResponsesFailure({ error: error.message }))
          )
        )
      )
    )
  )

  createResponse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ResponseActions.createResponse),
        switchMap(({ surveyResponse }) =>
          this.responseService.createResponse(surveyResponse).pipe(
            map((newResponse) =>
              ResponseActions.createResponseSuccess({ surveyResponse: newResponse })
            ),
            catchError((error) =>
              of(ResponseActions.createResponseFailure({ error: error.message }))
            )
          )
        )
      )
    );

};