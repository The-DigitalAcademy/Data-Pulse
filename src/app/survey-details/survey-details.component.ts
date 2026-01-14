import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Survey } from '../models/survey';
import { loadSurvey } from '../store/actions/survey.actions';
import { map, Observable, take } from 'rxjs';
import { selectSurveyById } from '../store/selectors/survey.selector';
import { selectAllResponses, selectResponsesBySurveyId } from '../store/selectors/response.selector';
import { SurveyResponse } from '../models/response';
import { loadResponses } from '../store/actions/response.actions';

// Works on back page 
@Component({
  selector: 'survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
    surveys$!: Observable<Survey | null>;
    response$!: Observable<SurveyResponse[] | null>
    
  constructor(
    private readonly route: ActivatedRoute,
    private store: Store,
  ) {}

  respondentCount = 0;

  ngOnInit(): void {
    const surveyIdParam = this.route.snapshot.paramMap.get('id');
    const survey_id = surveyIdParam ? Number(surveyIdParam) : null;

     if (survey_id !== null && !Number.isNaN(survey_id)) {
      this.surveys$ = this.store.select(selectSurveyById(survey_id));
      this.response$ = this.store.select(selectResponsesBySurveyId(survey_id))
      this.store.dispatch(loadSurvey({ id: survey_id }));
      this.store.dispatch(loadResponses({surveyId: survey_id}))
    } else {
      console.error('Invalid survey id');
    }
  }

  numOfRespondents() {
    this.surveys$.pipe(
      map(survey => survey?.surveyResponse?.length ?? 0),
      take(1)
    )
    .subscribe(count => {
      this.respondentCount = count;
    });}

  // Number of people who picked what choice 
  // Check the number of respondents for each choice 

  numOfRespondentsPerChoice() {
     
  }
}
