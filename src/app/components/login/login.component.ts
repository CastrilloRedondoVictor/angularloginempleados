import { Component } from '@angular/core';
import { Router } from '@angular/router';// Servicio para manejar la autenticación
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private _empleadosService: EmpleadosService,
    private router: Router
  ){}

  // Método para manejar el envío del formulario
  onLogin() {
    // Llamamos al servicio de autenticación
    this._empleadosService.login(this.username, this.password).subscribe(
      (response) => {
        // Al recibir una respuesta positiva, almacenamos el token en el localStorage
        localStorage.setItem('access_token', response.response);
        this.router.navigate(['/profile']);  // Redirigimos al usuario a la página principal
      },
      (error) => {
        // Si ocurre un error, mostramos el mensaje de error
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    );
  }
}
