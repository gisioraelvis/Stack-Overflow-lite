import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterLink } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { Observable } from 'rxjs';
import { IUser, IUserAnalytics } from 'src/app/shared/interfaces/IUser';
import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { Store } from '@ngrx/store';
import * as UserSelectors from 'src/app/state/selectors/user.selector';
import * as UserActions from 'src/app/state/actions/user.actions';

@Component({
  selector: 'app-user-dashboard',
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
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  loading: boolean = false;
  user!: IUser;
  userAnalytics!: IUserAnalytics;

  constructor(private location: Location, private store: Store) {}

  ngOnInit(): void {
    this.store.select(UserSelectors.currentUser).subscribe((user) => {
      this.user = user;
      if(user.id){
        this.getUserAnalytics(user.id);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  getUserAnalytics(userId: number | string) {
    this.loading = true;
    this.store.dispatch(UserActions.getUserAnalytics({ userId }));
    this.store.select(UserSelectors.userAnalytics).subscribe((analytics) => {
      this.userAnalytics = analytics;
    });    
    this.loading = false;
  }
}
