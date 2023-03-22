import { createAction, props } from '@ngrx/store';
import { ISiteAnalytics } from 'src/app/shared/interfaces/IAnalytics';

export const getSiteAnalytics = createAction('[User] Get Site Analytics');

export const getSiteAnalyticsSuccess = createAction(
  '[User] Get Site Analytics Success',
  props<ISiteAnalytics>()
);

export const getSiteAnalyticsFailure = createAction(
  '[User] Get Site Analytics Failure',
  props<{ error: string }>()
);
