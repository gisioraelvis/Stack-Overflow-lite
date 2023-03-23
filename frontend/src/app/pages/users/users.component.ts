import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from 'src/app/components/user/user.component';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, RouterLink } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { Store } from '@ngrx/store';
import * as usersActions from 'src/app/state/actions/user.actions';
import * as usersSelectors from 'src/app/state/selectors/user.selectors';
import * as SiteAnalyticsActions from 'src/app/state/actions/site-analytics.actions';
import * as SiteAnalyticsSelectors from 'src/app/state/selectors/admin-analytics.selectors';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortUsersPipe } from 'src/app/shared/pipes/users-sort.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    RouterModule,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    SearchComponent,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    ProgressSpinnerComponent,
    ThousandSeparatorPipe,
    SortUsersPipe,
    NgxPaginationModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  position: TooltipPosition = 'above';
  users$?: Observable<IUser[]>;
  sortBy: string = 'Newest';

  userCategories: {
    label: string;
    userCategorie: string;
  }[] = [
    { label: 'Most Answers', userCategorie: 'most-answers' },
    {
      label: 'Most Questions',
      userCategorie: 'most-questions',
    },
    { label: 'Newest', userCategorie: 'newest' },
  ];
  selecteduserCategory: string = 'popular';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      usersActions.getUsers({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );

    this.store.select(usersSelectors.getUsersLoading).subscribe((loading) => {
      this.loading = loading;
    });

    this.store
      .select(SiteAnalyticsSelectors.siteAnalytics)
      .subscribe((analytics) => {
        this.totalItems = analytics.totalUsers;
      });

    this.store.dispatch(SiteAnalyticsActions.getSiteAnalytics());

    this.users$ = this.store.select(usersSelectors.users);
  }

  onPageChange($event: number) {
    this.page = $event;

    this.store.select(usersSelectors.getUsersLoading).subscribe((loading) => {
      this.loading = loading;
    });

    this.store.dispatch(
      usersActions.getUsers({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );

    this.users$ = this.store.select(usersSelectors.users);
  }
}
