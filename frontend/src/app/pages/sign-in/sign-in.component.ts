import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/state/actions/user.actions';
import * as UserSelectors from 'src/app/state/selectors/user.selectors';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ProgressSpinnerComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loading = false;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        UserActions.signIn({
          email: this.form.get('email')!.value!,
          password: this.form.get('password')!.value!,
        })
      );

      this.store.select(UserSelectors.signInLoading).subscribe((loading) => {
        this.loading = loading;
      });

      this.store.select(UserSelectors.currentUser).subscribe((user) => {
        if (user.id) {
          if (user.isAdmin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      });
    }
  }
}
