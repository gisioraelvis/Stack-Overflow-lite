import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterLink } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { ISiteAnalytics } from 'src/app/shared/interfaces/IAnalytics';
import { Store } from '@ngrx/store';
import * as UserSelectors from 'src/app/state/selectors/user.selectors';
import * as SiteAnalyticsActions from 'src/app/state/actions/admin-analytics.actions';
import * as SiteAnalyticsSelectors from 'src/app/state/selectors/admin-analytics.selectors';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    RouterModule,
    RouterLink,
    ThousandSeparatorPipe,
    ProgressSpinnerComponent,
    TimeAgoPipe,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    ThousandSeparatorPipe,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  loading: boolean = false;
  user!: IUser;
  siteAnalytics!: ISiteAnalytics;

  constructor(private location: Location, private store: Store) {}

  ngOnInit(): void {
    this.store.select(UserSelectors.currentUser).subscribe((user) => {
      this.user = user;
      this.getSiteAnalytics();
    });
  }

  goBack(): void {
    this.location.back();
  }

  getSiteAnalytics() {
    this.loading = true;
    this.store.dispatch(SiteAnalyticsActions.getSiteAnalytics());
    this.store
      .select(SiteAnalyticsSelectors.siteAnalytics)
      .subscribe((analytics) => {
        this.siteAnalytics = analytics;
      });
    this.loading = false;
  }
}
