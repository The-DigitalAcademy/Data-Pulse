import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../service/results.service';
import { ActivatedRoute } from '@angular/router';

interface ResultQuestion {
  questionID: number;
  questionText: string;
  answers: { answerID: number; answerText: string; count: number }[];
}

@Component({
  selector: 'survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  results: ResultQuestion[] = [];
  respondentCount = 0;

  constructor(
    private resultsService: ResultsService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const surveyIdParam = this.route.snapshot.paramMap.get('id');
    const survey_id = surveyIdParam ? Number(surveyIdParam) : null;
    if (survey_id !== null && !Number.isNaN(survey_id)) {
      this.getSurveyDetails(survey_id);
    } else {
      console.error('Invalid survey id');
    }
  }

  getSurveyDetails(id: number) {
    this.resultsService.getResults(id).subscribe({
      next: (data) => {
        console.log(data);
        this.results = data.results;
        this.respondentCount = data.respondentCount;
      },
      error: (err) => {
        console.log('Error loading results:', err.message);
        this.results = [];
        this.respondentCount = 0;
      }
    });
  }
}
