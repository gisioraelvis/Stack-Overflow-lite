import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SiteAnalyticsActions from '../actions/admin-analytics.actions';
import { ISiteAnalytics } from 'src/app/shared/interfaces/IAnalytics';
import { AdminDashBoardService } from 'src/app/pages/admin-dashboard/admin-analytics.service';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private adminDashBoardService: AdminDashBoardService
  ) {}

  siteAnalytics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SiteAnalyticsActions.getSiteAnalytics),
      mergeMap(() => {
        return this.adminDashBoardService.getSiteAnalytics().pipe(
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
