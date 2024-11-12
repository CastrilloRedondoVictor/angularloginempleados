import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadosaxiosService } from '../services/empleadosaxios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: EmpleadosaxiosService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const token = this.authService.getToken();  // Obtener el token desde el servicio

    // Si hay un token y estás en la página de login, redirige a la página principal o perfil
    if (token) {
      if (next.routeConfig?.path === 'login') {
        this.router.navigate(['/profile']);  // O la ruta que quieras redirigir, por ejemplo '/home'
        return false;  // Impide el acceso a /login
      }
      return true;  // Permite el acceso a las rutas protegidas si hay token
    }

    // Si no hay token, redirige a login solo si no estás ya en la página de login
    if (next.routeConfig?.path !== 'login') {
      this.router.navigate(['/login']);  // Redirige al login si no hay token
      return false;  // Impide el acceso a cualquier ruta protegida
    }

    return true;  // Si estamos en /login y no hay token, permitir el acceso (no hacer nada)
  }
}
