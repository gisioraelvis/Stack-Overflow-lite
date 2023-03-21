import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private localStorageService: LocalStorageService) {}

  private name = '';
  isSignedIn = false;

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAuthStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isSignedIn) {
        resolve(true);
      } else {
        const JWT = this.localStorageService.getJWT();
        if (JWT) {
          this.isSignedIn = true;
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  signOut() {
    this.isSignedIn = false;
    this.localStorageService.removeJWT();
  }
}
