import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/authLogin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Obtener el rol del usuario del servicio AuthService
    return this.authService.isAdmin().pipe(
        take(1), // Tomar solo un valor del Observable
        map(userRole => {
            // Verificar si el rol permite acceder a la ruta
            if (userRole) {
                return true;  // El usuario es un administrador y puede acceder a la ruta
            } else {
                this.router.navigate(['/dashboard']);
                return false;
            }
        })
    );
  }
}
