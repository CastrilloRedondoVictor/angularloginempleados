import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosaxiosService {

  constructor() { }

  // Método para realizar el login y obtener el token de autenticación
  login(userName: string, password: string): Observable<any> {
    return new Observable(observer => {
      axios.post('https://apiempleadoscoreoauth.azurewebsites.net/Auth/Login', {
        userName,
        password
      })
      .then(response => {
        observer.next(response.data); // Emite los datos de respuesta
        observer.complete(); // Completa el Observable
      })
      .catch(error => {
        observer.error(error); // En caso de error, emite el error
      });
    });
  }

  // Método para obtener el token almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para obtener el perfil del empleado
  getPerfil(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return new Observable(observer => {
        observer.error('Token no disponible');
        observer.complete();
      });
    }

    return new Observable(observer => {
      axios.get('https://apiempleadoscoreoauth.azurewebsites.net/api/Empleados/PerfilEmpleado', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  // Método para obtener la lista de subordinados
  getSubordinados(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      return new Observable(observer => {
        observer.error('Token no disponible');
        observer.complete();
      });
    }

    return new Observable(observer => {
      axios.get('https://apiempleadoscoreoauth.azurewebsites.net/api/Empleados/Subordinados', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
}
