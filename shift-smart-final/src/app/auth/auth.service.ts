import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {}

  signup(email: string, password: string) {
    // Simulate signup process, e.g., send request to API
    // Upon successful signup, update logged in status and redirect
    this.loggedIn = true;
    this.router.navigate(['/home']);
  }

  login(email: string, password: string) {
    // Simulate login process, e.g., send request to API
    // Upon successful login, update logged in status and redirect
    this.loggedIn = true;
    this.router.navigate(['/home']);
  }

  logout() {
    // Simulate logout process, e.g., clear session or token
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}