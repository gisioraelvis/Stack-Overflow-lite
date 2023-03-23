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
import { ThousandSeparatorPipe } from 'src/app/shared/pipes/thousand-separator.pipe';
import { HighlightDirective } from 'src/app/shared/directives/highlight.directive';
import { Store } from '@ngrx/store';
import * as tagsActions from 'src/app/state/actions/tags.actions';

@Component({
  selector: 'app-tag',
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
    ThousandSeparatorPipe,
    HighlightDirective,
  ],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  position: TooltipPosition = 'above';
  @Input() tag!: ITag;
  @Input() searchTermHighlight?: string;

  constructor(private store: Store) {}

  deleteTag() {
    this.store.dispatch(tagsActions.deleteTag({ id: this.tag.id }));
  }

  // TODO: Implement edit tag
  editTag() {
    throw new Error('Method not implemented.');
  }
}
