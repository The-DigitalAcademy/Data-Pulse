import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private readonly http: HttpClient) { }
  private readonly url = '/api/response';
  getBySurveyId(surveyID: number): Observable<Response[]>{
    return this.http.get<Response[]>(this.url).pipe(
      //@ts-ignore
      map((responses: response[]) => {
        return responses.filter(r => r.surveyId === surveyID);
      })
    );
  }

  createResponse(resp: Response): Observable<Response>{
    return this.http.post<Response>(this.url, resp);
  }
}
