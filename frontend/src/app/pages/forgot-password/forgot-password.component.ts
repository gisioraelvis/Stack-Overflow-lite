import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/state/actions/user.actions';
import * as UserSelectors from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  message?: string;
  passwordResetRequested = false;
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        UserActions.forgotPassword({
          email: this.form.get('email')!.value!,
        })
      );
      this.passwordResetRequested = true;
    }
    this.store.select(UserSelectors.responseMessage).subscribe((message) => {
      if (message) {
        this.message = message;
      }
    });
  }
}
