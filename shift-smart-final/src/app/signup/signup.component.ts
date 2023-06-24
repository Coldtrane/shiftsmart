import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  confirmPassword: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    this.authService.signup(this.email, this.password);
  }

}