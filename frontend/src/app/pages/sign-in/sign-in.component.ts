import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { signIn } from 'src/app/state/actions/user.actions';
import { Store } from '@ngrx/store';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { AppState } from 'src/app/state/appState';

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        signIn({
          email: this.form.get('email')!.value!,
          password: this.form.get('password')!.value!,
        })
      );
      // TODO: fix the navigation delay
      if (this.authorizationService.isSignedIn) {
        this.router.navigate(['dashboard']);
      }
    }
  }
}
