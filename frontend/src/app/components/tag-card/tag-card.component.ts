import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipGrid, MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { ITag } from 'src/app/shared/interfaces/ITag';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

export interface Tag {
  name: string;
  description: string;
  count: number;
}

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
    RouterModule
  ],
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.css'],
})
export class TagCardComponent {
deleteTag() {
throw new Error('Method not implemented.');
}
editTag() {
throw new Error('Method not implemented.');
}
  @Input() tag!: ITag;
}
