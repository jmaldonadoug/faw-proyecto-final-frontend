import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginResponse } from '../../models/login.model';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl(''),
    clave: new FormControl('')
  });

  constructor(private http: HttpClient) {

  }

  goRegister () {
    this.router.navigateByUrl('/register')
  }

  onLogin() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<LoginResponse>(`${API_URL}/auth/login`, this.loginForm.value, { headers }).subscribe(res => {
      localStorage.setItem('@token', res.token);
      localStorage.setItem('@usuario', JSON.stringify(res.usuario));

      this.router.navigateByUrl('/home');
    }, e => {
      const message = e?.error?.message ? e.error.message : 'Error desconocido';
      alert(message);
      console.log(e);
    });
  }
}