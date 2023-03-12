import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-answer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css'],
})
export class AddAnswerComponent {
  answerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.answerForm = this.fb.group({
      answer: ['', Validators.required],
    });
  }

  // TODO: Submit to the backend
  onSubmit() {
    // if (this.form.valid) {
    //   console.log(this.form.value);
    // }
    console.log(this.answerForm.value);
  }
}
