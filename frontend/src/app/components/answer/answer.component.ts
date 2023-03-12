import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TruncatePipe,
    TimeAgoPipe,
  ],
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent {
  @Input() answer!: IAnswer;
}
