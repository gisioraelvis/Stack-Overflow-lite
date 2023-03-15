import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAnswer } from 'src/app/shared/interfaces/IAnswer';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { CommentComponent } from '../comment/comment.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TruncatePipe,
    TimeAgoPipe,
    CommentComponent,
    AddCommentComponent,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent{
  loading: boolean = false;
  @Input() answer!: IAnswer;
}
