import { Component } from '@angular/core';
import { SurveyService } from '../service/survey.service';
import { Survey } from '../models/survey';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: false
})
export class ResultsComponent {
  constructor(private surveyService: SurveyService) {}
    survey = this.surveyService.getAll()
    data: any[] = [];
    closedSurveys: Survey[] = [];
    ngOnInit() {
      this.loadClosedSurveys();
      this.survey.subscribe((data: any) =>
        this.data = data
    )
    }

  private loadClosedSurveys(): void {
    this.surveyService.getAll().subscribe({
      next: (surveys) => {
        this.closedSurveys = surveys.filter(s => !s.isOpen);
      },
      error: (err) => {
        console.error('Failed to load surveys', err);
        alert('Could not load results');
      }
    });
  }
}
