import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GetTareasResponse, Tarea, TareaResponse } from '../../models/tarea.model';
import dayjs from 'dayjs';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

const API_URL = 'http://localhost:8080';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  dayjs = dayjs;

  tareaForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    prioridad: new FormControl('Baja')
  });
  searchForm = new FormGroup({
    titulo: new FormControl(''),
    ordenar: new FormControl('A-Z'),
    prioridad: new FormControl('0')
  });
  data: Tarea[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getTareas();
  }

  toggleOrder() {
    if (this.searchForm.value.ordenar === 'A-Z') {
      this.searchForm.setControl('ordenar', new FormControl('Z-A'));
    } else {
      this.searchForm.setControl('ordenar', new FormControl('A-Z'));
    }
  }

  getTareas() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` });
    this.http.get<GetTareasResponse>(`${API_URL}/tareas`, { headers }).subscribe(res => {
      this.data = res.data;
    }, e => {
      const message = e?.error?.message ? e.error.message : 'Error desconocido';
      alert(message);
      console.log(e);
    });
  }

  insertTarea() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` });
    this.http.post<TareaResponse>(`${API_URL}/tarea/store`, this.tareaForm.value, { headers }).subscribe(res => {
      alert(res.message);
      this.tareaForm.reset({ prioridad: 'Baja' });
      this.data = res.data;
    }, e => {
      const message = e?.error?.message ? e.error.message : 'Error desconocido';
      alert(message);
      console.log(e);
    });
  }

  finishTarea(id: number, titulo: string) {
    const cond = confirm(`¿Seguro desea finalizar esta tarea: "${titulo}"?`);
    if (cond) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` });
      this.http.post<TareaResponse>(`${API_URL}/tarea/${id}/finish`, {}, { headers }).subscribe(res => {
        alert(res.message);
        this.data = res.data;
      }, e => {
        const message = e?.error?.message ? e.error.message : 'Error desconocido';
        alert(message);
        console.log(e);
      });
    }
  }

  searchTareas() {
    const { titulo, ordenar, prioridad } = this.searchForm.value;
    const url = `${API_URL}/tareas/search?titulo=${titulo}&ordenar=${ordenar}&prioridad=${prioridad}`;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` });
    this.http.get<GetTareasResponse>(url, { headers }).subscribe(res => {
      this.data = res.data;
    }, e => {
      const message = e?.error?.message ? e.error.message : 'Error desconocido';
      alert(message);
      console.log(e);
    });
  }
}
