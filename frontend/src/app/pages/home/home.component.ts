import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { FilterQuestionsPipe } from 'src/app/shared/pipes/questions-filter.pipe';
import { SortQuestionsPipe } from 'src/app/shared/pipes/questions-sort.pipe';
import { Store } from '@ngrx/store';
import * as questionsActions from 'src/app/state/actions/questions.actions';
import * as questionsSelectors from 'src/app/state/selectors/questions.selectors';
import * as SiteAnalyticsActions from 'src/app/state/actions/site-analytics.actions';
import * as SiteAnalyticsSelectors from 'src/app/state/selectors/admin-analytics.selectors';

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

    this.store.dispatch(SiteAnalyticsActions.getSiteAnalytics());
    this.store
      .select(SiteAnalyticsSelectors.siteAnalytics)
      .subscribe((analytics) => {
        this.totalItems = analytics.totalQuestions;
      });
    this.questions$ = this.store.select(questionsSelectors.questions);
  }

  ngOngChanges(): void {
    if (this.searchTerm) {
      this.searchQuestions(this.searchTerm);
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  searchQuestions(searchTerm: string | undefined | null) {
    this.store.dispatch(
      questionsActions.searchQuestions({
        searchTerm: searchTerm,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );
    this.questions$ = this.store.select(questionsSelectors.questions);
  }

  onPageChange($event: number) {
    this.page = $event;
    this.store.dispatch(
      questionsActions.getQuestions({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );
  }
}
