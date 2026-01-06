import { Component } from '@angular/core';
import {  SurveyService } from 'src/app/service/survey.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: false
})
export class MainPageComponent {
  constructor(private surveyservice:SurveyService,){}
  survey = this.surveyservice
  data: any[] = [];
  newData: any[] = []

  ngOnInit() {
    this.survey.getAll().subscribe( (data) => {
      this.data = data,
      this.checkClosed(this.data)
  })
 }

 checkClosed ( data: any ) {
     data.forEach((item: any, index: any) => {
    if (!item.isOpen) {
      this.newData.push(item);   
      data.splice(index, 1);      
    }
  });
} 

check() {
  console.log(this.newData)
}

}


