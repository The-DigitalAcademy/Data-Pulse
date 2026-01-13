import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header/header.component';
import { ResultsComponent } from './results/results.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { AdminPageComponent } from './admin-page-component/admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateSurveyCompoundComponent } from './create-survey-compound/create-survey-compound.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { SurveyComponent } from './component/survey-fill/survey/survey.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './store/reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.development';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthEffects } from './store/effects/auth.effects';
import { SurveyEffects } from './store/effects/survey.effects';
import { surveysFeatureKey, surveyReducer } from './store/reducers/survey.reducer';

// Meta-reducer to sync state with localStorage
function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [authFeatureKey, surveysFeatureKey], // Persist both auth and surveys
    rehydrate: true,                            // Restore state from localStorage on app load
    storage: window.localStorage
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
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
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    StoreModule.forRoot({
      [authFeatureKey]: authReducer,
      [surveysFeatureKey]: surveyReducer
    }, {metaReducers}),

    EffectsModule.forRoot([AuthEffects, SurveyEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
