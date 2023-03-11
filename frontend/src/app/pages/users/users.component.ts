import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from 'src/app/components/user/user.component';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { delay, Observable, of, tap } from 'rxjs';
import { userFactory } from 'src/app/db';
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
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  position: TooltipPosition = 'above';
  users$?: Observable<IUser[]>;

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

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.users$ = of(userFactory.buildList(50)).pipe(
      delay(500), // simulate 1 second delay
      tap(() => {
        this.loading = false;
      })
    );
  }
}
