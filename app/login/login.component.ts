import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {   //validation of login button 
    const isLoginSuccessful = this.authService.login(this.username, this.password);
    if (isLoginSuccessful) {
      this.router.navigateByUrl('/home');
    } else {
      this.errorMessage = 'Invalid username or password. Please try again.';
      alert(this.errorMessage);
    }
  }

  showAlertMessage(): void {
    alert('You need to login first!');
  }
}