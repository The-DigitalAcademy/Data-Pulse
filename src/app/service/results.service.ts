import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError, map } from 'rxjs';
import { SurveyService } from './survey.service';
import { survey } from '../models/survey';
import { ResponseService } from './response.service';
import { surveyResults } from '../models/surveyResults';
import { response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private readonly url = '/api/results';
  foundClosedSurveys: survey[] = [];
  constructor(
    private readonly http: HttpClient,
    private readonly surveyService: SurveyService,
    private readonly responseService: ResponseService
  ){}

  //GET ALL CLOSED SURVEYS
  getAllSurveys(): Observable<survey[]>{
    return this.surveyService.getAll().pipe(
      //@ts-ignore
      map((closedSurveys: survey[]) => {
        closedSurveys.find((cS) => {
          if(!cS.isOpen)
            this.foundClosedSurveys.push(cS);
        });
        return this.foundClosedSurveys;
      })
    )
  }
  getResults(surveyID: number): Observable<{ results: surveyResults; respondentCount: number }> {
    return this.surveyService.getAll().pipe(
      map((surveys: survey[]) => {
        const cSurvey = surveys.find((s) => s.id === surveyID);
        if (!cSurvey) throw new Error('Survey does not exist');
        //if (cSurvey.isOpen) throw new Error('Results are only available for closed surveys');
        return cSurvey;
      }),
      switchMap((survey: survey) =>
        this.responseService.getBySurveyId(survey.id).pipe(
          //@ts-ignore
          map((responses: response[]) => ({
            survey,
            responses,
            respondentCount: new Set(responses.map(r => r.userId)).size
          }))
        )
      ),
      map(({ survey, responses, respondentCount }) => ({
        results: this.aggregateResults(survey, responses),
        respondentCount
      })),
      catchError(err => throwError(() => err))
    );
  }
  private aggregateResults(survey: survey, responses: response[]): surveyResults {
    const questionMap = new Map<
      number,
      { text: string; answers: Map<number, { text: string; count: number }> }
    >();

    // 1. Initialize all questions + choices
    for (const q of survey.questions) {
      const answerMap = new Map<number, { text: string; count: number }>();
      for (const c of q.choices) {
        answerMap.set(c.id, { text: c.text, count: 0 });
      }
      questionMap.set(q.id, { text: q.text, answers: answerMap });
    }

    // 2. Count each answer
    for (const resp of responses) {
      for (const a of resp.answers) {
        const qData = questionMap.get(a.questionId);
        if (!qData) continue;
        const choiceData = qData.answers.get(a.choiceId);
        if (choiceData) choiceData.count++;
      }
    }

    // 3. Convert to final format
    return Array.from(questionMap.entries()).map(([qId, qData]) => ({
      questionID: qId,
      questionText: qData.text,
      answers: Array.from(qData.answers.entries())
        .map(([aId, aData]) => ({
          answerID: aId,
          answerText: aData.text,
          count: aData.count
        }))
        .filter(a => a.count > 0)   // Hides zero-count answers
    }));
  }

}
