import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { IUser } from 'src/app/shared/interfaces/IUser';

@Component({
  selector: 'app-user',
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
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  position: TooltipPosition = 'above';
  @Input() user!: IUser;
  deleteuser() {
    throw new Error('Method not implemented.');
  }
  edituser() {
    throw new Error('Method not implemented.');
  }
}