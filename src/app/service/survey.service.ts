import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, take } from 'rxjs';
import { newSurveyDto, Survey } from '../models/survey';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { User, UserDto } from '../models/user';
import { selectCurrentUser } from '../store/selectors/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  private readonly url = environment.baseUrl;
  isAuthenticatedAdmin$: Observable<UserDto>;

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService,
    private store: Store
) {
  this.isAuthenticatedAdmin$ = this.store.select(selectCurrentUser);
 }

  //helper method to ensure that only coordinators can CRUD surveys
  private requireCoordinator(){
    this.isAuthenticatedAdmin$.pipe(take(1)).subscribe(
      authenticatedUser => {
        if(!(authenticatedUser.role === 'COORDINATOR')) {
          alert("Coordinator access only")
        }
      }
    )
  }

  //get all the surveys
  getAll(): Observable<Survey[]>{
    return this.http.get<Survey[]>(this.url+'/surveys');
  }


  //create a survey
  createSurvey(survey: newSurveyDto): Observable<Survey>{
    this.requireCoordinator();
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
