import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { delay, Observable, of, tap } from 'rxjs';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { answerFactory, commentFactory, questionFactory } from 'src/app/db';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { AddCommentComponent } from 'src/app/components/add-comment/add-comment.component';
import { MatDividerModule } from '@angular/material/divider';
import { IAnswer } from 'src/app/shared/interfaces/IAnswer';
import { AnswerComponent } from 'src/app/components/answer/answer.component';
import { AddAnswerComponent } from 'src/app/components/add-answer/add-answer.component';

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
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponentPage implements OnInit {
  id?: Number;
  loading: boolean = false;
  question$?: Observable<IQuestion>;
  comments$?: Observable<IComment[]>;
  answers$?: Observable<IAnswer[]>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) {}
  ngOnInit(): void {
    // question/?id=1
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.question$ = this.getQuestion(this.id).pipe(
      tap((question) => {
        this.comments$ = this.getComments(question.id);
        this.answers$ = this.getAnswers(question.id);
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  getQuestion(id: Number): Observable<IQuestion> {
    this.loading = true;
    return of(questionFactory.build()).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }

  getComments(id: Number): Observable<IComment[]> {
    this.loading = true;
    return of(commentFactory.buildList(5)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }

  getAnswers(id: number): Observable<IAnswer[]> {
    this.loading = true;
    return of(answerFactory.buildList(5)).pipe(
      delay(500), // simulate delay
      tap(() => {
        this.loading = false;
      })
    );
  }
}
