import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, RouterLink } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { Observable, of, delay, tap } from 'rxjs';
import { QUESTIONS } from 'src/app/db';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { QuestionComponent } from 'src/app/components/question/question.component';

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
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  loading: boolean = false;
  page: number = 1;
  questions$?: Observable<IQuestion[]>;

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
  selectedquestionCategory: string = 'newest';

  ngOnInit(): void {
    this.getQuestions();
  }

  // TODO: implement infinite scroll pagination
  getQuestions() {
    this.loading = true;
    this.questions$ = of(QUESTIONS).pipe(
      delay(1000), // simulate 1 second delay
      tap(() => {
        this.loading = false;
      })
    );
  }
}