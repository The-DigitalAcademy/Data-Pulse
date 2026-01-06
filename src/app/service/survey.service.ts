import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private readonly url = '/api/survey';
  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService
) { }

  //helper method to ensure that only coordinators can CRUD surveys
  private requireCoordinator(){
    const coordinator = this.auth.getCurrentUser();
    if(!coordinator || coordinator.role !== 'coordinator')
      throw new Error('Coordinator access only');
  }

  //get all the surveys
  getAll(): Observable<survey[]>{
    return this.http.get<survey[]>(this.url);
  }

  //create a survey
  createSurvey(Survey: Omit<survey, 'id' | 'createdAt'>): Observable<survey>{
    this.requireCoordinator();
    console.log(Survey);
    const newSurvey = {
      ...Survey,
      createdAt: new Date().toISOString(),
    };
    console.log("Survey in the service: ", newSurvey);
    return this.http.post<survey>(this.url, newSurvey);
  }

  //update a survey
  updateSurvey(Survey: survey): Observable<survey>{
    this.requireCoordinator();
    return this.http.put<survey>(`${this.url}/${Survey.id}`, Survey);
  }

  //delete a survey
  delete(id: number): Observable<void>{
    this.requireCoordinator();

    return this.http.delete<void>(`${this.url}/${id}`);


  }

  //open the survey
  openSurvey(Survey: survey): Observable<survey>{
    this.requireCoordinator();
    return this.http.patch<survey>(`${this.url}/${Survey.id}`, {
      isOpen: true,
      openedAt: new Date().toISOString(),
    });
  }

  //close the survey
  closeSurvey(survey: survey): Observable<survey>{
    this.requireCoordinator();
    return this.http.patch<survey>(`${this.url}/${survey.id}`, {
      isOpen: false,
      closedAt: new Date().toISOString(),
    });
  }
}
