import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ITag } from 'src/app/shared/interfaces/ITag';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatListModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatMenuModule,
    RouterModule,
    TruncatePipe,
    MatTooltipModule,
  ],
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.css'],
})
export class TagCardComponent {
  position: TooltipPosition = 'above';
  @Input() tag!: ITag;

  deleteTag() {
    throw new Error('Method not implemented.');
  }
  editTag() {
    throw new Error('Method not implemented.');
  }
}
