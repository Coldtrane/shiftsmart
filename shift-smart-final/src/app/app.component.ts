import { Router } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'my-app';


  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }

  isSignupPage(): boolean {
    return this.router.url.includes('/signup');
  }
}
