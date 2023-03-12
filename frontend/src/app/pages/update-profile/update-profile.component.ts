import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
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
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { API_URL } from 'src/app/constants';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';

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
    FileUploadModule,
    FileUploadComponent
  ],
})
export class UpdateProfileComponent implements OnInit {
  uploader: FileUploader;
  imagePreview: any;

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group(
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
      {
        validator: this.passwordMatchValidator,
      }
    );

    this.uploader = new FileUploader({
      url: `${API_URL}/upload`,
      allowedFileType: ['image'],
    });
  }
  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onFileSelected() {
    const file: File = this.uploader.queue[0]._file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Do something with the form data here
      console.log(this.profileForm.value);
    }
  }
}
