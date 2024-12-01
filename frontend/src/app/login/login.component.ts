import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent {
  checked = false;
  signupData = { 
    username: '', 
    email: '', 
    phone: '', 
    password: '' 
  };
  loginData = { 
    email: '', 
    password: '' 
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSignup(event: Event) {
    event.preventDefault();
    this.apiService.signup(this.signupData).subscribe({
      next: () => {
        alert('Signup successful');
        this.checked = false; 
      },
      error: (error) => {
        alert('Signup failed. Try again.');
        console.error('Signup error:', error);
      }
    });
  }
  
  onLogin(event: Event) {
    event.preventDefault();
    this.apiService.login(this.loginData).subscribe({
      next: (response: any) => {
        alert('Login successful');
        this.apiService.storeToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Login failed. Check your credentials.');
        console.error('Login error:', error);
      }
    });
  }
}