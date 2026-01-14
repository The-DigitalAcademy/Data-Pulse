import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { newSurveyDto, Survey } from '../models/survey';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private readonly url = environment.baseUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService
) { }

  //helper method to ensure that only coordinators can CRUD surveys
  private requireCoordinator(){
    const coordinator = this.auth.getCurrentUser();
    if(!coordinator || coordinator.role !== 'COORDINATOR')
      throw new Error('Coordinator access only');
  }

  //get all the surveys
  getAll(): Observable<Survey[]>{
    return this.http.get<Survey[]>(this.url+'/surveys');
  }


  //create a survey
  createSurvey(survey: newSurveyDto): Observable<Survey>{
    // this.requireCoordinator();
    console.log(survey);
    const newSurvey = {
      ...survey,
      // createdAt: new Date().toISOString(),
    };
    console.log("Survey in the service: ", newSurvey);
    return this.http.post<Survey>(this.url+'/surveys', newSurvey);
  }

  //update a survey
  updateSurvey(Survey: Survey): Observable<Survey>{
    this.requireCoordinator();
    return this.http.put<Survey>(`${this.url}/${Survey.id}`, Survey);
  }

  //delete a survey
  delete(id: number): Observable<void>{
    this.requireCoordinator();

    return this.http.delete<void>(`${this.url}/${id}`);


  }

  //open the survey
  openSurvey(Survey: Survey): Observable<Survey>{
    this.requireCoordinator();
    return this.http.patch<Survey>(`${this.url}/${Survey.id}`, {
      isOpen: true,
      openedAt: new Date().toISOString(),
    });
  }

  //close the survey
  closeSurvey(survey: Survey): Observable<Survey>{
    this.requireCoordinator();
    return this.http.patch<Survey>(`${this.url}/${survey.id}`, {
      isOpen: false,
      closedAt: new Date().toISOString(),
    });
  }
}
