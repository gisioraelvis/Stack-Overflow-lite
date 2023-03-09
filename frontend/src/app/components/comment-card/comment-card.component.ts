import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() comment!: IComment;
}
