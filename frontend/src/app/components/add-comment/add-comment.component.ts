import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent {
  commentForm: FormGroup;
  @Input() id!: number;
  @Input() for!: string;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  // TODO: Submit to the backend
  onSubmit() {
    if (this.for === 'question') {
      console.log(
        `Question comment {questionId:${this.id}, comment:${this.commentForm.value.comment}}`
      );
    }

    if (this.for === 'answer') {
      console.log(
        `Answer comment {answerId:${this.id}, comment:${this.commentForm.value.comment}}`
      );
    }
  }
}
