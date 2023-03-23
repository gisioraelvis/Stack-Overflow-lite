import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { UserEffects } from './state/effects/user.effects';
import { userReducer } from './state/reducers/user.reducer';
import { siteAnalyticsReducer } from './state/reducers/site-analytics.reducer';
import { questionsReducer } from './state/reducers/questions.reducer';
import { QuestionsEffects } from './state/effects/questions.effect';
import { SiteAnalyticsEffects } from './state/effects/site-analytics.effects';
import { tagsReducer } from './state/reducers/tags.reducer';
import { TagsEffects } from './state/effects/tags.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavigationComponent,
    FooterComponent,
    StoreModule.forRoot({
      user: userReducer,
      siteAnalytics: siteAnalyticsReducer,
      questions: questionsReducer,
      tags: tagsReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([
      UserEffects,
      SiteAnalyticsEffects,
      QuestionsEffects,
      TagsEffects,
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
