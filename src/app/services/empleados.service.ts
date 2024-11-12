import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient,
  ) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>('https://apiempleadoscoreoauth.azurewebsites.net/Auth/Login', { userName, password })
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getPerfil(): Observable<any> {

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://apiempleadoscoreoauth.azurewebsites.net/api/Empleados/PerfilEmpleado', { headers })
  }

  getSubordinados(): Observable<any> {

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://apiempleadoscoreoauth.azurewebsites.net/api/Empleados/Subordinados', { headers })
  }
}
