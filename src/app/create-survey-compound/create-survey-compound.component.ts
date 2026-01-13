import { Component } from '@angular/core';
import { SurveyService } from '../service/survey.service';
import { newSurvey, Survey } from '../models/survey';
import { Question } from '../models/question';
import {createSurvey } from '../store/actions/survey.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-survey-compound',
  templateUrl: './create-survey-compound.component.html',
  styleUrls: ['./create-survey-compound.component.css']
})
export class CreateSurveyCompoundComponent {
  title = '';
  desc = '';
  questions: Question[] = [];
  newQuestionText = '';
  newChoiceText = '';
  newChoices: string[] = [];
  survey!: Survey;

  constructor(private surveyService: SurveyService, private store: Store) {}

  addQuestion() {
    console.log(this.newChoices)
    const validOptions= this.newChoices.filter(opt => opt.trim() !='')
    if (this.newQuestionText && validOptions.length > 0) {
      console.log(this.newQuestionText);
      console.log(validOptions.length)
      const question: Question = {
        text: this.newQuestionText,
        choices: validOptions.map((Opt, i) => ({
          id: i + 1,
          text: Opt,
        })),
        id: 0
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
    const survey: newSurvey = {
      title: this.title,
      desc: this.desc,
      questions: this.questions,
      isOpen: false
    };

    console.log("Survey in the component: ", survey);

    this.store.dispatch(createSurvey({survey}));
    
  }
}
