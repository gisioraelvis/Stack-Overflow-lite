import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SiteAnalyticsActions from '../actions/site-analytics.actions';
import { ISiteAnalytics } from 'src/app/shared/interfaces/IAnalytics';
import { SiteAnalyticsService } from 'src/app/shared/services/site-analytics.service';

@Injectable()
export class SiteAnalyticsEffects {
  constructor(
    private actions$: Actions,
    private siteAnalyticsService: SiteAnalyticsService
  ) {}

  siteAnalytics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SiteAnalyticsActions.getSiteAnalytics),
      mergeMap(() => {
        return this.siteAnalyticsService.getSiteAnalytics().pipe(
          map((successResponse: ISiteAnalytics) => {
            return SiteAnalyticsActions.getSiteAnalyticsSuccess({
              totalUsers: successResponse.totalUsers,
              totalQuestions: successResponse.totalQuestions,
              totalAnswers: successResponse.totalAnswers,
              totalComments: successResponse.totalComments,
              totalTags: successResponse.totalTags,
              totalVotes: successResponse.totalVotes,
            });
          }),
          catchError((error) =>
            of(SiteAnalyticsActions.getSiteAnalyticsFailure({ error }))
          )
        );
      })
    );
  });
}
