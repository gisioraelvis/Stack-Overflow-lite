import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  AbstractControlOptions,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PasswordMatchErrorState } from 'src/app/shared/utils/password-match-error-state';
import { passwordPatternValidator } from 'src/app/shared/utils/password-pattern-validator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/appState';
import { signUp } from 'src/app/state/actions/user.actions';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  formOptions: AbstractControlOptions = {
    validators: this.passwordMatchValidator,
  };
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordPatternValidator ]],
      confirmPassword: ['', [Validators.required]],
    },
    this.formOptions
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  passwordMatchErrorState = new PasswordMatchErrorState();

   onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        signUp({
          name: this.form.get('name')!.value!,
          email: this.form.get('email')!.value!,
          password: this.form.get('password')!.value!,
          confirmPassword: this.form.get('confirmPassword')!.value!,
        })
      );
      if (this.authorizationService.isSignedIn) {
        this.router.navigate(['dashboard']);
      }
    }
  }
}
