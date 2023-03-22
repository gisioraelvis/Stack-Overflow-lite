import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  AbstractControlOptions,
  FormGroup,
} from '@angular/forms';
import { PasswordMatchErrorState } from 'src/app/shared/utils/password-match-error-state';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { passwordPatternValidator } from 'src/app/shared/utils/password-pattern-validator';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/state/actions/user.actions';
import * as UserSelectors from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-password-reset',
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
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  public form: FormGroup;
  resetToken?: string;
  formOptions: AbstractControlOptions = {
    validators: this.passwordMatchValidator,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, passwordPatternValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      this.formOptions
    );
  }

  ngOnInit() {
    // reset-password/?resetToken=token
    const resetToken = this.route.snapshot.queryParamMap.get('resetToken');

    if (!resetToken) {
      this.router.navigate(['forgot-password']);
    } else {
      this.resetToken = resetToken;
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  passwordMatchErrorState = new PasswordMatchErrorState();

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        UserActions.resetPassword({
          resetToken: this.resetToken!,
          password: this.form.get('password')!.value!,
          confirmPassword: this.form.get('confirmPassword')!.value!,
        })
      );
    }
    // sign in user after password reset
    this.store.select(UserSelectors.currentUser).subscribe((user) => {
      if (user.id) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
