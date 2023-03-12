import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordMatchErrorState } from 'src/app/shared/utils/password-match-error-state';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
export class PasswordResetComponent {
  token: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    // reset-password/?token=token
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    // TODO: if token is empty, redirect to forgot-password page
  }

  resetPasswordForm = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: this.passwordMatchValidator }
  );

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.resetPasswordForm.value);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  passwordMatchErrorState = new PasswordMatchErrorState();
}
