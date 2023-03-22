import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISiteAnalyticsState } from 'src/app/shared/interfaces/IAnalytics';

const selectSiteAnalytics =
  createFeatureSelector<ISiteAnalyticsState>('siteAnalytics');

export const siteAnalytics = createSelector(
  selectSiteAnalytics,
  (state) => state.siteAnalytics
);
