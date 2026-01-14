import { Component, OnInit } from '@angular/core';
import { ResponseService } from './../../../service/response.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSurveyById } from 'src/app/store/selectors/survey.selector';
import { Observable, take } from 'rxjs';
import { Survey } from 'src/app/models/survey';
import { Question } from 'src/app/models/question';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  selectedSurvey$!: Observable<Survey | undefined>;
  currentSurveyOpened!: Survey | undefined;
  currentSurveyQuestions: Question[] = [];

  private selected = new Map<number, number>();

  responses!: Response;
  id = 0;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private responseService: ResponseService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']) || 0;
      
      if (this.id) {
        this.loadSurveyFromStore();
      } else {
        console.error('No survey ID found in route parameters');
        this.router.navigate(['/home']);
      }
    });
  }

  loadSurveyFromStore(): void {
    this.selectedSurvey$ = this.store.select(selectSurveyById(this.id));
    this.selectedSurvey$.pipe(take(1)).subscribe({
      next: (survey) => {
        if (survey) {
          console.log('Survey loaded from store:', survey);
          this.currentSurveyOpened = survey;
          
          // initialise questions
          this.currentSurveyQuestions = survey.questions?.map(q => ({
            ...q,
            choiceOptions: q.choiceOptions?.map(choice => ({
              ...choice,
              // if optionText null/undefined - indicate with static message.
              optionText: choice.optionText || `Missing text - ${choice.id}`
            })) || []
          })) || [];
          
          this.loading = false;
        } else {
          console.error('Survey not found in store for ID:', this.id);
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Error loading survey from store:', error);
        this.loading = false;
      }
    });
  }

  answerQuestion(questionId: number, choiceId: any): void {
    if (choiceId) {
      this.selected.set(questionId, choiceId);
    }
  }

  canSubmit(): boolean {
    if (!this.currentSurveyQuestions || this.currentSurveyQuestions.length === 0) {
      return false;
    }
    return this.currentSurveyQuestions.every((q: Question) => this.selected.has(q.id));
  }

  submitButton() {
    if (!this.currentSurveyOpened) {
      alert('No survey loaded');
      return;
    }

    const answers = Array.from(this.selected.entries()).map(([qID, cID]) => ({
      questionId: qID,
      choiceId: cID
    }));

    this.responses = {
      id: 0,
      surveyId: this.id,
      userId: '',
      answers: answers,
      submittedAt: new Date().toISOString()
    };

    this.responseService.createResponse(this.responses).subscribe({
      next: (res) => {
        alert('Survey Submitted! Thank you for your participation.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Survey Submission failed! ' + err.message);
      }
    });
  }
}