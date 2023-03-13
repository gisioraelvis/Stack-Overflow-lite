import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterLink } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { delay, Observable, of, tap } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { userFactory } from 'src/app/db';

@Component({
  selector: 'app-user-dashboard',
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
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  loading: boolean = false;
  user$?: Observable<IUser>;

  ngOnInit(): void {
    this.getUser();
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
}
