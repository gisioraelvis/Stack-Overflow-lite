import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { IMessage } from 'src/app/shared/interfaces/IMessage';
import { ILoginSuccess } from 'src/app/shared/interfaces/ILoginSuccess';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(user: IUser): Observable<IMessage> {
    return this.http.post<IMessage>(`${API_URL}/auth/register`, user);
  }

  loginUser(loginUser: IUser): Observable<IMessage> {
    return this.http.post<ILoginSuccess>(`${API_URL}/auth/login`, loginUser);
  }

  updateProfile(user: IUser): Observable<any> {
    return this.http.put<any>(`${API_URL}/auth/update-profile`, user);
  }
}
