import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { throwError } from 'rxjs';
import { User} from 'src/app/models/user';
import { SurveyService } from '../service/survey.service';
import { Survey } from '../models/survey';
import { Question } from '../models/question';

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

  constructor(private surveyService: SurveyService) {}

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
    const surveyToSend: Omit<Survey, 'id' | 'createdAt'> = {
    title: this.title,
    desc: this.desc,
    coordinator: this.survey.coordinator,
    questions: this.questions,
    isOpen: false
  };
    console.log("Survey in the component: ", surveyToSend);

    this.surveyService.createSurvey(surveyToSend).subscribe(
      {
        next: (createdSurvey) => {
          console.log(createdSurvey);
        },
        error: (err) => {
          throwError(() => new Error('Could not create a new survey'));
        }
      }
    );

    alert("Save Successful")
  }
}
