import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../models/response';
import { survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private readonly http: HttpClient) { }
  private readonly url = '/api/response';
  getBySurveyId(surveyID: number): Observable<response[]>{
    return this.http.get<response[]>(this.url).pipe(
      //@ts-ignore
      map((responses: response[]) => {
        return responses.filter(r => r.surveyId === surveyID);
      })
    );
  }

  createResponse(resp: response): Observable<response>{
    return this.http.post<response>(this.url, resp);
  }
}
