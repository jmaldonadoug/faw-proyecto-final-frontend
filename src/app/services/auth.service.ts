import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  router = inject(Router);

  constructor() { 

  }

  isAuth() {
    const token = localStorage.getItem('@token') ?? '';
    this.token = token;

    return token.length > 0;
  }

  onLogout() {
    localStorage.removeItem('@token');
    localStorage.removeItem('@usuario');

    this.router.navigateByUrl('/login');
  }
  
}
