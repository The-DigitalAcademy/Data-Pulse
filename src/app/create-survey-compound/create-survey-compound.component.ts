import { Component } from '@angular/core';
import { SurveyService } from '../service/survey.service';
import { newSurveyDto, Survey } from '../models/survey';
import { Question, QuestionDto } from '../models/question';
import {createSurvey } from '../store/actions/survey.actions';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectCurrentUser } from '../store/selectors/auth.selector';
import { UserDto } from '../models/user';

@Component({
  selector: 'app-create-survey-compound',
  templateUrl: './create-survey-compound.component.html',
  styleUrls: ['./create-survey-compound.component.css']
})
export class CreateSurveyCompoundComponent {
  title = '';
  desc = '';
  questions: QuestionDto[] = [];
  newQuestionText = '';
  newChoiceText = '';
  newChoices: string[] = [];
  survey!: Survey;

  currentUser$!: Observable<UserDto>;

  constructor(private surveyService: SurveyService, private store: Store) {}

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  addQuestion() {
    console.log(this.newChoices)
    const validOptions= this.newChoices.filter(opt => opt.trim() !='')
    if (this.newQuestionText && validOptions.length > 0) {
      console.log(this.newQuestionText);
      console.log(validOptions.length)
      const question: QuestionDto = {
        text: this.newQuestionText,
        choices: validOptions.map((Opt, i) => ({
          // id: i + 1,
          text: Opt,
        })),
        // id: 0
      }
      this.questions.push(question);
      console.log(this.questions);
      this.newQuestionText = '';
      this.newChoices = ['','','',''];
    }
  }
  addOption(){
    this.newChoices.push(this.newChoiceText);
    console.log(this.newChoiceText);
    this.newChoiceText = '';
  }
  submit(){

    this.currentUser$.pipe(take(1)).subscribe( currentUser => {
      const newSurvey: newSurveyDto = {
        title: this.title,
        desc: this.desc,
        questions: this.questions,
        isOpen: false,
        coordinator: currentUser
      };
      this.store.dispatch(createSurvey({survey:newSurvey}));
      console.log("Survey in the component: ", newSurvey);
    });

  }
}
