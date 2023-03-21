import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/constants';
import {
  IUserProfile,
  IUserProfileUpdate,
} from 'src/app/shared/interfaces/IUser';
import { IMessage } from 'src/app/shared/interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  constructor(private http: HttpClient) {}

  updateProfile(user: IUserProfileUpdate): Observable<IUserProfile> {
    return this.http.put<IUserProfile>(`${API_URL}/auth/update-profile`, user);
  }
}
