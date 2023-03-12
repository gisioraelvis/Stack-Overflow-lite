import { Validators } from '@angular/forms';

export const passwordPatternValidator = Validators.pattern(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
);
