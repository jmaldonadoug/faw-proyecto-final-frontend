import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginResponse } from '../../models/login.model';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);
  registerForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    clave: new FormControl(''),
    genero: new FormControl('M')
  });

  constructor(private http: HttpClient) {

  }

  goLogin () {
    this.router.navigateByUrl('/login');
  }

  insertUsuario() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<LoginResponse>(`${API_URL}/auth/register`, this.registerForm.value, { headers }).subscribe(res => {
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
