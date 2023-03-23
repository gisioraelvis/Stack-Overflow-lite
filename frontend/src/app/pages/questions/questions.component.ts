import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { Observable } from 'rxjs';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { FilterQuestionsPipe } from 'src/app/shared/pipes/questions-filter.pipe';
import { SortQuestionsPipe } from 'src/app/shared/pipes/questions-sort.pipe';
import { SearchComponent } from 'src/app/components/search/search.component';
import { Store } from '@ngrx/store';
import * as questionsActions from 'src/app/state/actions/questions.actions';
import * as questionsSelectors from 'src/app/state/selectors/questions.selectors';
import * as SiteAnalyticsActions from 'src/app/state/actions/site-analytics.actions';
import * as SiteAnalyticsSelectors from 'src/app/state/selectors/admin-analytics.selectors';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    QuestionComponent,
    ProgressSpinnerComponent,
    ThousandSeparatorPipe,
    FilterQuestionsPipe,
    SortQuestionsPipe,
    MatButtonModule,
    MatTabsModule,
    SearchComponent,
    NgxPaginationModule,
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems?: number;
  questions$?: Observable<IQuestion[]>;
  sortBy: string = 'Newest';

  // search
  searchType?: string = 'Keyword';
  searchTerm?: string;

  questionCategories: {
    label: string;
    questionCategorie: string;
  }[] = [
    { label: 'Newest', questionCategorie: 'newest' },
    { label: 'Answered', questionCategorie: 'answered' },
    {
      label: 'Unanswered',
      questionCategorie: 'unanswered',
    },
  ];

  selectedquestionCategory: number = this.questionCategories.findIndex(
    (questionCategory) => questionCategory.questionCategorie === 'newest'
  );

  constructor(private route: ActivatedRoute, private store: Store) {}

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

    this.store
      .select(SiteAnalyticsSelectors.siteAnalytics)
      .subscribe((analytics) => {
        console.log('analytics', analytics);

        this.totalItems = analytics.totalQuestions;
      });

    this.store.dispatch(SiteAnalyticsActions.getSiteAnalytics());

    // /questions?filter=answered&userId=1
    const filter = this.route.snapshot.queryParamMap.get('filter');
    const userId = this.route.snapshot.queryParamMap.get('userId');
    if (filter && userId && !this.searchTerm) {
      this.userQuestions(filter, userId!);
    }

    // /questions?filter=unanswered
    if (filter === 'unanswered') {
      this.questions$ = this.store.select(questionsSelectors.questions);
      this.sortBy = 'Unanswered';
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) =>
          questionCategory.questionCategorie === 'unanswered'
      );
    }

    // /questions?filter=answered
    if (filter === 'answered') {
      this.questions$ = this.store.select(questionsSelectors.questions);
      this.sortBy = 'Most Answered';
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) => questionCategory.questionCategorie === 'answered'
      );
    }

    // /questions?tag=some-tag
    const tag = this.route.snapshot.queryParamMap.get('tag');
    if (tag) {
      this.searchTerm = tag;
      this.questions$ = this.store.select(questionsSelectors.questions);
    }

    // /questions?searchType=Keyword&search=searchTerm
    const searchType = this.route.snapshot.queryParamMap.get('searchType');
    const searchTerm = this.route.snapshot.queryParamMap.get('search');
    if (searchType && searchTerm) {
      this.searchType = searchType;
      this.searchTerm = searchTerm;
      this.questions$ = this.store.select(questionsSelectors.questions);
    }

    // /questions
    if (!filter && !userId) {
      this.questions$ = this.store.select(questionsSelectors.questions);
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  ngOnChanges() {
    if (this.searchTerm) {
      this.searchQuestions(this.searchTerm);
    }
  }

  userQuestions(filter: string | null, userId: string) {
    if (filter) {
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) => questionCategory.questionCategorie === filter
      );
    }

    this.store
      .select(questionsSelectors.getQuestionsLoading)
      .subscribe((loading) => {
        this.loading = loading;
      });

    this.store.dispatch(
      questionsActions.getQuestionsByUser({
        userId: userId,
        pagination: { page: this.page, itemsPerPage: this.itemsPerPage },
      })
    );

    this.questions$ = this.store.select(questionsSelectors.questions);
  }

  searchQuestions(searchTerm: string | undefined | null) {
    this.store
      .select(questionsSelectors.getQuestionsLoading)
      .subscribe((loading) => {
        this.loading = loading;
      });

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

    this.store
      .select(questionsSelectors.getQuestionsLoading)
      .subscribe((loading) => {
        this.loading = loading;
      });

    this.store.dispatch(
      questionsActions.getQuestions({
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      })
    );
  }
}
