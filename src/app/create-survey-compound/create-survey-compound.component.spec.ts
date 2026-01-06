import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyCompoundComponent } from './create-survey-compound.component';

describe('CreateSurveyCompoundComponent', () => {
  let component: CreateSurveyCompoundComponent;
  let fixture: ComponentFixture<CreateSurveyCompoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSurveyCompoundComponent]
    });
    fixture = TestBed.createComponent(CreateSurveyCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
