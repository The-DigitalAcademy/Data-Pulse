// src/app/pages/admin-page/admin-page.component.ts
import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/service/survey.service';
import { Survey } from 'src/app/models/survey';
import { SelectSurveyByUserId } from 'src/app/store/selectors/survey.selector';
import { Store } from '@ngrx/store';
import { SurveyState } from 'src/app/store/state/survey.state';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  data: Survey[] = [];

  constructor(
    private surveyService: SurveyService,
    private store: Store<SurveyState>
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
    
  }


  private loadSurveys(): void {
    // this.surveyService.getAll().subscribe({
    //   next: (surveys) => this.data = surveys,
    //   error: (err) => console.error('Load failed', err)
    // });
   console.log(this.store.select(SelectSurveyByUserId)

   )

  }


  toggleOpenClose(survey: Survey, index: number): void {
    const action$ = survey.isOpen
      ? this.surveyService.closeSurvey(survey)
      : this.surveyService.openSurvey(survey);

    action$.subscribe({
      next: (updated) => {
        this.data[index - 1] = updated;
        this.loadSurveys();
      },
      error: (err) => {
        console.error('Toggle failed', err);
        alert('Could not update survey status');
      }
    });
  }

  deleteItem(id: number, index: number): void {
    if (!confirm('Delete this survey? This cannot be undone.')) return;

    this.surveyService.delete(id).subscribe({
      next: () => {
        this.data.splice(index, 1);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete survey');
      }
    });
  }

  isAdmin(): void {
    console.log('Admin access verified');
    // Add real auth check later
  }
}
