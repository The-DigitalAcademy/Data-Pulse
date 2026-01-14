import { Component, OnInit } from '@angular/core';
import { ResponseService } from './../../../service/response.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSurveyById } from 'src/app/store/selectors/survey.selector';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/models/survey';
import { Question } from 'src/app/models/question';
import { ResponseDto, Response } from 'src/app/models/response';
import { selectCurrentUser, selectUserId } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  selectedSurvey$!: Observable<Survey>;
  currentSurveyOpened!: Survey;
  currentSurveyQuestions: Question[] = [];

  userId!: any;
  surveyId: number = 0;

  // Answer tracking – Map<questionId, choiceId>
  private selectedAnswers = new Map<number, number>();

  constructor(
    private route: ActivatedRoute,
    private responseService: ResponseService,
    private router: Router,
    private store: Store,
  ) { 
    this.store.select(selectUserId).subscribe({
      next: (resp) => {
        if (resp) {
          console.log(`User id from store: ${resp}`);
          this.userId = resp;
        }
      }
    });
  }

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedSurvey$ = this.store.select(selectSurveyById(this.surveyId));
    
    this.selectedSurvey$.subscribe(survey => {
      if (survey) {
        console.log(`Selected survey from store:`, survey);
        this.currentSurveyOpened = survey;
        this.currentSurveyQuestions = survey.questions || [];
      }
    });
  }

  answerQuestion(questionId: number, choiceId: any): void {
    if (choiceId != null) {
      this.selectedAnswers.set(questionId, choiceId);
      console.log(`Question ${questionId} answered with choice ${choiceId}`);
    }
  }

  canSubmit(): boolean {
    if (!this.currentSurveyQuestions || this.currentSurveyQuestions.length === 0) {
      return false;
    }
    // Check if all questions have been answered
    return this.currentSurveyQuestions.every((q: Question) => this.selectedAnswers.has(q.id));
  }

  submitButton(): void {
    if (!this.currentSurveyOpened) {
      alert('No survey loaded');
      return;
    }

    if (!this.userId) {
      alert('User not authenticated');
      return;
    }

    // Build answers array
    const answers = Array.from(this.selectedAnswers.entries()).map(([questionId, choiceId]) => ({
      questionId: questionId,
      choiceId: choiceId
    }));

    // Build the response DTO
    const responseDto: ResponseDto = {
      surveyId: this.currentSurveyOpened.id,
      userId: this.userId,
      answers: answers,
      submittedAt: new Date().toISOString()
    };

    console.log('Submitting response:', responseDto);

    this.responseService.createResponse(responseDto).subscribe({
      next: (res) => {
        console.log('Response submitted successfully:', res);
        alert('Survey Submitted! Thank you for your participation.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Survey submission error:', err);
        alert('Survey Submission failed! ' + (err.error?.message || err.message));
      }
    });
  }
}