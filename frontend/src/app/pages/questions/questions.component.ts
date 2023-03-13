import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { Observable, of, delay, tap } from 'rxjs';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { questionFactory } from 'src/app/db';
import { FilterQuestionsPipe } from 'src/app/shared/pipes/questions-filter.pipe';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    CommonModule,
    QuestionComponent,
    RouterModule,
    RouterLink,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ProgressSpinnerComponent,
    ThousandSeparatorPipe,
    FilterQuestionsPipe,
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  loading: boolean = false;
  page: number = 1;
  questions$?: Observable<IQuestion[]>;
  tag?: string | null;

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
    // /questions?filter=unanswered
    const filter = this.route.snapshot.queryParamMap.get('filter');
    const userId = this.route.snapshot.queryParamMap.get('userId');

    // /questions?tag=some-tag
    const tag = this.route.snapshot.queryParamMap.get('tag');
    if (tag) {
      this.tag = tag;
    }

    if ((filter || userId) && !this.tag) {
      this.userQuestions(filter, userId);
    }

    if (filter === 'unanswered') {
      this.getQuestions();
      this.selectedquestionCategory = this.questionCategories.findIndex(
        (questionCategory) =>
          questionCategory.questionCategorie === 'unanswered'
      );
    }

    if (!filter && !userId) {
      this.getQuestions();
    }

    if (this.tag) { 
      this.getQuestions();
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
}
