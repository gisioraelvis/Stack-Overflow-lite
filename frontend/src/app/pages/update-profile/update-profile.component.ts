import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SafePipeModule } from 'safe-pipe';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { Store } from '@ngrx/store';
import * as UserSelectors from 'src/app/state/selectors/user.selectors';
import * as UserActions from 'src/app/state/actions/user.actions';
import { IUser, IUserProfileUpdate } from 'src/app/shared/interfaces/IUser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SafePipeModule,
    FileUploadComponent,
  ],
})
export class UpdateProfileComponent implements OnInit {
  public form: FormGroup;
  user$?: Observable<IUser>;

  formOptions: AbstractControlOptions = {
    validators: this.passwordMatchValidator,
  };

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        aboutMe: ['', Validators.maxLength(200)],
      },
      this.formOptions
    );
  }
  ngOnInit(): void {
    this.user$ = this.store.select(UserSelectors.currentUser);
    this.user$.subscribe((user) => {
      this.form.patchValue({
        name: user.name,
        email: user.email,
        aboutMe: user.bio,
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.form.valid) {
      const user: IUserProfileUpdate = {
        name: this.form.get('name')!.value!,
        email: this.form.get('email')!.value!,
        password: this.form.get('password')!.value!,
        confirmPassword: this.form.get('confirmPassword')!.value!,
        bio: this.form.get('aboutMe')!.value!,
      };
      this.store.dispatch(UserActions.updateProfile(user));
    }

    // Get the updated user details
    this.store.select(UserSelectors.currentUser).subscribe((user) => {
      this.form.patchValue({
        name: user.name,
        email: user.email,
        aboutMe: user.bio,
      });
    });
  }
}
