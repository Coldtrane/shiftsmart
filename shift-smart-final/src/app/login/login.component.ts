import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('Email:', this.email, 'Password:', this.password);
    
  }

  login() {
    this.authService.login(this.email, this.password);
  }
}