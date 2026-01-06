import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header/header.component';
import { ResultsComponent } from './results/results.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';
import { FormLogin } from './login-page/component/form-login/form-login';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { SurveyComponent } from './component/survey-fill/survey/survey.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    FormLogin,
    SurveyComponent,
    SurveyDetailsComponent,
    HeaderComponent,
    ResultsComponent,
    MainPageComponent,
    AdminPageComponent,
    CreateSurveyCompoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    RouterModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
