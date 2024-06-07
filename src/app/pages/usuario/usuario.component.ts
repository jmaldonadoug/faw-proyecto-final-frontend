import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  nombre: string = '';
  email: string = '';
  fecha_nacimiento: string = '';
  clave: string = '';
  genero: string = '';

}
