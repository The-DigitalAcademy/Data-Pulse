import { Component, OnInit } from '@angular/core';
import { ResponseService } from './../../../service/response.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/service/survey.service';
import { Response } from 'src/app/models/response';
import { Store } from '@ngrx/store';
import { selectSelectedSurveyId, selectSurveyById } from 'src/app/store/selectors/survey.selector';
import { Observable, take } from 'rxjs';
import { Survey } from 'src/app/models/survey';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  selectedSurvey$!: Observable<Survey>;
  currentSurveyOpened!: Survey;
  currentSurveyQuestions!: Question[];

  // 1. Data coming from the service
  survey = this.surveyService.getAll();
  options: any[] = [];
  option: any = {};

  // 2. Answer tracking – Map<questionId, choiceId>
  private selected = new Map<number, number>();

  // 3. Final payload
  responses!: Response;
  id = 0;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private responseService: ResponseService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.survey.subscribe((data: any[]) => {
      this.options = data;
      this.id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
      this.option = data.find(o => o.id === this.id) ?? {};
    });

   this.selectedSurvey$ = this.store.select(selectSurveyById(this.id));
   this.selectedSurvey$.pipe(take(1)).subscribe(survey => {
     console.log(`Display selected survey from store ${JSON.stringify(survey)}`);
     this.currentSurveyOpened = survey;
     this.currentSurveyQuestions = survey.questions;
   });
  }

  // Called from the template when a radio button is clicked
  answerQuestion(questionId: number, choiceId: any): void {
    this.selected.set(questionId, choiceId);
  }

  // Helper – true only when every question has an answer
  canSubmit(): boolean {
    if (!this.option?.questions) return false;
    return this.option.questions.every((q: any) => this.selected.has(q.id));
  }

  // Build the payload exactly as you defined in the model
  submitButton() {
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

    return this.responseService.createResponse(this.responses).subscribe({
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
