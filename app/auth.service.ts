import { Injectable } from '@angular/core'; //authentication of user
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private readonly validUsername = 'admin';
  private readonly validPassword = 'password';

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this.loggedIn = true;
      sessionStorage.setItem('encryptedPwd',btoa(password));
      console.log(atob('cGFzc3dvcmQ='));
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}