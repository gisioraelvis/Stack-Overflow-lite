import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { delay, Observable, of, tap } from 'rxjs';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { AddCommentComponent } from 'src/app/components/add-comment/add-comment.component';
import { MatDividerModule } from '@angular/material/divider';
import { AnswerComponent } from 'src/app/components/answer/answer.component';
import { AddAnswerComponent } from 'src/app/components/add-answer/add-answer.component';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { MatCardModule } from '@angular/material/card';
import { ScrollToDirective } from 'src/app/shared/directives/scroll-to.directive';
import { Store } from '@ngrx/store';
import * as questionsActions from 'src/app/state/actions/questions.actions';
import * as questionsSelectors from 'src/app/state/selectors/questions.selectors';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [
    CommonModule,
    QuestionComponent,
    CommentComponent,
    AddCommentComponent,
    RouterModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ProgressSpinnerComponent,
    ThousandSeparatorPipe,
    MatDividerModule,
    AnswerComponent,
    AddAnswerComponent,
    TimeAgoPipe,
    ScrollToDirective,
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponentPage implements OnInit {
  id?: number | string;
  loading: boolean = false;
  question$?: Observable<IQuestion>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {}

  ngOnInit(): void {
    // question/?id=1
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.store.dispatch(
      questionsActions.getQuestionById({
        id: this.id,
      })
    );

    this.store
      .select(questionsSelectors.getQuestionByIdLoading)
      .subscribe((loading) => {
        this.loading = loading;
      });

    this.question$ = this.store.select(questionsSelectors.question);
  }

  goBack(): void {
    this.location.back();
  }
}
