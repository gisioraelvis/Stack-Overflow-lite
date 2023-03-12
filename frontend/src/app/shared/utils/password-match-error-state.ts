import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

// Custom error state matcher for password match validation
export class PasswordMatchErrorState implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control?.parent?.hasError('mismatch') &&
      (control?.dirty || control?.touched)
    );
  }
}
