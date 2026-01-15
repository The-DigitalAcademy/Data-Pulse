// src/app/pages/admin-page/admin-page.component.ts
import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/service/survey.service';
import { Survey } from 'src/app/models/survey';
import { selectAllSurveys } from 'src/app/store/selectors/survey.selector';
import { selectUserId } from 'src/app/store/selectors/auth.selector';
import { Store } from '@ngrx/store';
import { SurveyState } from 'src/app/store/state/survey.state';
import *   as SurveyActions from '../../store/actions/survey.actions'
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  data: Survey[] = [];

  allSurveys$: Observable<Survey[] | []>;
  userId$: Observable<string | null>;

  constructor(
    private surveyService: SurveyService,
    private store: Store<SurveyState>
  ) {
    // Dispatch the general load first (from API)
    this.store.dispatch(SurveyActions.loadSurveys());

    this.allSurveys$ = this.store.select(selectAllSurveys);
    this.userId$ = this.store.select(selectUserId);
  }

    ngOnInit(): void {
      this.loadSurveys();
    }


    /**
     * filter - only show surveys of the current coordinator user
     */
    private loadSurveys(): void {
      // Get current user ID once (since it won't change)
      this.userId$.pipe(
        take(1) // complete after first value
      ).subscribe(userId => {
        if (!userId) {
          this.data = [];
          return;
        }
        // Convert to number if needed (since userId$ is string | null)
        // const numericUserId = userId;
        // Now get all surveys and filter them
        this.allSurveys$.pipe(
          take(1)
        ).subscribe(surveys => {
          this.data = surveys.filter(
            survey => survey.coordinator?.id === userId
          );
        });
      });
    }


  toggleOpenClose(survey: Survey, index: number): void {
    const action$ = survey.isOpen
      ? this.surveyService.closeSurvey(survey)
      : this.surveyService.openSurvey(survey);

    action$.subscribe({
      next: (updated) => {
        this.data[index - 1] = updated;
        // this.loadSurveys();
      },
      error: (err) => {
        console.error('Toggle failed', err);
        alert('Could not update survey status');
      }
    });
  }

  
  deleteItem(id: number): void {
    if (!confirm('Delete this survey? This cannot be undone.')) return;

    this.surveyService.delete(id).subscribe({
      next: () => {
        // this.data.splice(index, 1);
        console.log(this.data)
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
