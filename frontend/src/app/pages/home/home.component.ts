import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { delay, Observable, of, tap } from 'rxjs';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { questionFactory } from 'src/app/db';
import { FilterQuestionsPipe } from 'src/app/shared/pipes/questions-filter.pipe';
import { SortQuestionsPipe } from 'src/app/shared/pipes/questions-sort.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    QuestionComponent,
    CommentComponent,
    NgxPaginationModule,
    PaginatorComponent,
    ProgressSpinnerComponent,
    FilterQuestionsPipe,
    SortQuestionsPipe,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  questions$?: Observable<IQuestion[]>;
  sortBy: string = 'Newest';
  searchType?: string = 'Keyword';
  searchTerm?: string;

  ngOnInit(): void {
    this.getQuestions();
  }

  ngOngChanges(): void {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      this.searchQuestions(this.searchTerm); // TODO: implement search
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
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

  searchQuestions(searchTerm: string | undefined | null) {
    this.loading = true;
    // TODO: implement search
    this.questions$ = of(questionFactory.buildList(50)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }
}
