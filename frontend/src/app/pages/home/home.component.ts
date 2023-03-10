import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { QuestionCardComponent } from 'src/app/components/question-card/question-card.component';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { QUESTIONS } from 'src/app/db';
import { CommentCardComponent } from 'src/app/components/comment-card/comment-card.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    SearchComponent,
    QuestionCardComponent,
    CommentCardComponent,
    NgxPaginationModule,
    PaginatorComponent,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  loading?: boolean = false;
  page: number = 1;
  questions$?: Observable<IQuestion[]>;

  ngOnInit() {
    this.getQuestions();
  }

  // TODO: Implement pagination i.e fetch and update questions$ with the next page of questions
  getQuestions() {
    this.loading = true;
    this.questions$ = of(QUESTIONS);
    this.loading = false;
  }
}
