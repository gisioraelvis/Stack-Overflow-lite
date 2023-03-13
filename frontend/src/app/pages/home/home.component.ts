import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { delay, Observable, of, tap } from 'rxjs';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { questionFactory } from 'src/app/db';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    SearchComponent,
    QuestionComponent,
    CommentComponent,
    NgxPaginationModule,
    PaginatorComponent,
    FormsModule,
    ProgressSpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  questions$?: Observable<IQuestion[]>;

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.loading = true;
    this.questions$ = of(questionFactory.buildList(20)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }
}
