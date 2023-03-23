import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/appState';
import * as questionsActions from 'src/app/state/actions/questions.actions';
import * as SiteAnalyticsActions from 'src/app/state/actions/site-analytics.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      questionsActions.getQuestions({ page: 1, itemsPerPage: 10 })
    );

    this.store.dispatch(SiteAnalyticsActions.getSiteAnalytics());
  }
}
