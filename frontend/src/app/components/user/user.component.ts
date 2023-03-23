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
import { IUser, IUserAnalytics } from 'src/app/shared/interfaces/IUser';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/state/actions/user.actions';

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
  @Input() userAnalytics!: IUserAnalytics;

  constructor(private store: Store) {}

  deleteuser() {
    this.store.dispatch(userActions.deleteUser({ id: this.user.id }));
  }
  edituser() {
    throw new Error('Method not implemented.');
  }
}
