import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: IComment;
}
