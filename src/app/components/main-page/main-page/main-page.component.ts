import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SurveyService } from 'src/app/service/survey.service';
import { loadSurveys } from '../../../store/actions/survey.actions';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/models/survey';
import{selectAllSurveys} from '../../../store/selectors/survey.selector'


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: false,
})
export class MainPageComponent {
  surveys$: Observable<Survey[] | []>;
  

  constructor(private surveyservice: SurveyService, private store: Store) {
    this.surveys$ = this.store.select(selectAllSurveys);
  }
  survey = this.surveyservice;
  data: any[] = [];
  newData: any[] = [];

  ngOnInit() {
    this.store.dispatch(loadSurveys());
  }

  checkClosed(data: any) {
    data.forEach((item: any, index: any) => {
      if (!item.isOpen) {
        this.newData.push(item);
        data.splice(index, 1);
      }
    });
  }

  check() {
    console.log(this.newData);
  }
}
