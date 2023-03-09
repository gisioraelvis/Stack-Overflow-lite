import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { QuestionCardComponent } from 'src/app/components/question-card/question-card.component';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { COMMENTS, QUESTIONS } from 'src/app/db';
import { CommentCardComponent } from 'src/app/components/comment-card/comment-card.component';
import { IComment } from 'src/app/shared/interfaces/IComment';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  questions?: IQuestion[] = QUESTIONS;
  comments: IComment[] = COMMENTS;
}
