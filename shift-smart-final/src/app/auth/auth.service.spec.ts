import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() { }

  login() {
    // Perform login logic, such as making an HTTP request to the backend for authentication
    // If login is successful, set isLoggedIn to true
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout logic, such as clearing session storage or making an HTTP request to invalidate the session
    // Set isLoggedIn to false
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    // Return the current authentication state
    return this.isLoggedIn;
  }
}
