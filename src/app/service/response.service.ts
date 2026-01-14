import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyResponse } from '../models/response';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private readonly http: HttpClient) { }
  private readonly url = '/api/response';
  getBySurveyId(surveyID: number): Observable<SurveyResponse[]>{
    return this.http.get<SurveyResponse[]>(this.url).pipe(
      //@ts-ignore
      map((responses: SurveyResponse[]) => {
        return responses.filter(r => r.surveyId === surveyID);
      })
    );
  }

  createResponse(resp: SurveyResponse): Observable<SurveyResponse>{
    return this.http.post<SurveyResponse>(this.url, resp);
  }
}
