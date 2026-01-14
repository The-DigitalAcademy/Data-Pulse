import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyResponse } from '../models/response';
import { Survey } from '../models/survey';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private readonly url = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }
  
  getBySurveyId(surveyID: number): Observable<SurveyResponse[]>{
    return this.http.get<SurveyResponse[]>(this.url).pipe(
      //@ts-ignore
      map((responses: SurveyResponse[]) => {
        return responses.filter(r => r.surveyId === surveyID);
      })
    );
  }

  createResponse(resp: SurveyResponse): Observable<SurveyResponse>{
    return this.http.post<SurveyResponse>(this.url+'/response', resp);
  }
}
