import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { Observable, of, delay, tap } from 'rxjs';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { questionFactory } from 'src/app/db';
import { FilterQuestionsPipe } from 'src/app/shared/pipes/questions-filter.pipe';
import { SortQuestionsPipe } from 'src/app/shared/pipes/questions-sort.pipe';
import { SearchComponent } from 'src/app/components/search/search.component';

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
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // /questions?filter=answered&userId=1
    const filter = this.route.snapshot.queryParamMap.get('filter');
    const userId = this.route.snapshot.queryParamMap.get('userId');

    // /questions?filter=answered&userId=1
    if ((filter || userId) && !this.searchTerm) {
      this.userQuestions(filter, userId);
    }

    // /questions?filter=unanswered
    if (filter === 'unanswered') {
      this.getQuestions();
      this.sortBy = 'Unanswered';
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) =>
          questionCategory.questionCategorie === 'unanswered'
      );
    }

    // /questions?filter=answered
    if (filter === 'answered') {
      this.getQuestions();
      this.sortBy = 'Most Answered';
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) => questionCategory.questionCategorie === 'answered'
      );
    }

    // /questions?tag=some-tag
    const tag = this.route.snapshot.queryParamMap.get('tag');
    if (tag) {
      this.searchTerm = tag;
      this.getQuestions();
    }

    // /questions?searchType=Keyword&search=searchTerm
    const searchType = this.route.snapshot.queryParamMap.get('searchType');
    const searchTerm = this.route.snapshot.queryParamMap.get('search');
    if (searchType && searchTerm) {
      this.searchType = searchType;
      this.searchTerm = searchTerm;
      this.getQuestions();
    }

    // /questions
    if (!filter && !userId) {
      this.getQuestions();
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  ngOnChanges() {
    if (this.searchTerm) {
      this.getSearchQuestions(this.searchTerm);
    }
  }

  // TODO: implement infinite scroll pagination
  getQuestions() {
    this.loading = true;
    this.questions$ = of(questionFactory.buildList(50)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }

  userQuestions(filter: string | null, userId: string | null) {
    console.log(`filter: ${filter}, userId: ${userId}`);
    this.loading = true;
    this.questions$ = of(questionFactory.buildList(50)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );

    if (filter) {
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) => questionCategory.questionCategorie === filter
      );
    }
  }

  getSearchQuestions(searchTerm: string) {
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
