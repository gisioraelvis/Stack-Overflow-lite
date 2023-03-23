import { createReducer, on } from '@ngrx/store';
import { ISiteAnalyticsState } from 'src/app/shared/interfaces/IAnalytics';
import * as SiteAnalyticsActions from '../actions/site-analytics.actions';

const initialSiteAnalyticsState: ISiteAnalyticsState = {
  siteAnalytics: {
    totalUsers: 0,
    totalQuestions: 0,
    totalAnswers: 0,
    totalComments: 0,
    totalTags: 0,
    totalVotes: 0,
  },
  error: '',
  message: '',
};

export const siteAnalyticsReducer = createReducer(
  initialSiteAnalyticsState,
  on(SiteAnalyticsActions.getSiteAnalyticsSuccess, (state, siteAnalytics) => ({
    ...state,
    siteAnalytics,
  })),
  on(SiteAnalyticsActions.getSiteAnalyticsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
