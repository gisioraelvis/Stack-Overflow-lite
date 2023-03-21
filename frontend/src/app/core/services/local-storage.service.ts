import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private router: Router) {}

  setJWT(JWT: string) {
    localStorage.setItem('JWT', JWT);
  }

  getJWT() {
    // if (!localStorage.getItem('JWT')) {
    //   this.router.navigate(['/sign-in']);
    // }
    return localStorage.getItem('JWT');
  }

  removeJWT() {
    localStorage.removeItem('JWT');
  }
}
