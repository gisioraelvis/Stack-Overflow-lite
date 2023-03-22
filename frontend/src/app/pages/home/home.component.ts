import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { NgxPaginationModule } from 'ngx-pagination';
import { delay, Observable, of, tap } from 'rxjs';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { questionFactory } from 'src/app/db';
import { FilterQuestionsPipe } from 'src/app/shared/pipes/questions-filter.pipe';
import { SortQuestionsPipe } from 'src/app/shared/pipes/questions-sort.pipe';
import { Store } from '@ngrx/store';
import * as questionsActions from 'src/app/state/actions/questions.actions';
import * as questionsSelectors from 'src/app/state/selectors/questions.selectors';

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
  itemsPerPage: number = 10;
  totalItems?: number;
  questions$?: Observable<IQuestion[]>;
  sortBy: string = 'Newest';
  searchType?: string = 'Keyword';
  searchTerm?: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      questionsActions.getQuestions({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );
    this.store
      .select(questionsSelectors.getQuestionsLoading)
      .subscribe((loading) => {
        this.loading = loading;
      });
    this.questions$ = this.store.select(questionsSelectors.questions);
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

  // TODO: implement pagination take page number and items per page
  // /questions?page=1&itemsPerPage=10
  /*   getPage($event: number) {
    this.page = $event;
    console.log(`Page: ${this.page} Items per page: ${this.itemsPerPage}`);
    this.loading = true;
    this.questions$ = of(questionFactory.buildList(100)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.totalItems = 100;
        this.loading = false;
      })
    );
  } */
  getPage($event: number) {
    this.page = $event;
  }
}
