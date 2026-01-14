import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header-component/header/header.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';
import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { FormLogin } from './login-page/component/form-login/form-login';
import { SurveyComponent } from './component/survey-fill/survey/survey.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { authGuard } from './guard/auth.guard';
import { restrictingGuard } from './guard/restricting.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent, canActivate: [authGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [authGuard] },
  {
    path: 'details',
    component: SurveyDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'admin', component: AdminPageComponent, canActivate: [authGuard] },
  {
    path: 'create-survey',
    component: CreateSurveyCompoundComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [restrictingGuard],
  },
  { path: 'login', component: FormLogin, canActivate: [restrictingGuard] },
  {
    path: 'survey-fill/:id',
    component: SurveyComponent,
    canActivate: [authGuard],
  },
  {
    path: 'survey-detail/:id',
    component: SurveyDetailsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
