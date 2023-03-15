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
import { Observable, of, delay, tap } from 'rxjs';
import { analyticsFactory, userFactory } from 'src/app/db';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { IAnalytics } from 'src/app/shared/interfaces/IAnalytics';

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
  user$?: Observable<IUser>;
  analytics$?: Observable<IAnalytics>;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.getUser();
    this.getAnalytics();
  }

  goBack(): void {
    this.location.back();
  }

  getUser() {
    this.loading = true;
    this.user$ = of(userFactory.build()).pipe(
      delay(500), // simulate 1 second delay
      tap(() => {
        this.loading = false;
      })
    );
  }

  getAnalytics() {
    this.loading = true;
    this.analytics$ = of(analyticsFactory.build()).pipe(
      delay(500), // simulate 1 second delay
      tap(() => {
        this.loading = false;
      })
    );
  }
}
