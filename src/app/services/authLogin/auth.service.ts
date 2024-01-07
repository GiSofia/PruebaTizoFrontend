import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environments } from 'src/app/environments/enviroments';
import { LoginUser } from 'src/app/interfaces/loginUser.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginUser> {
    return this.http.get<LoginUser[]>(`${this.baseUrl}/loginUser?email=${email}&password=${password}`).pipe(
        map(users => users[0]),
        catchError(error => throwError(error)),
        mergeMap(user => {
            // Verificar si el usuario está activo antes de permitir el inicio de sesión
            if (user && user.isActive) {
                return of(user);
            } else {
                return throwError('User is not active');
            }
        })
    );
}


  saveUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number | null {
    const userIdStr = localStorage.getItem('userId');
    return userIdStr ? parseInt(userIdStr, 10) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getUserId();
  }

  isAdmin(): Observable<boolean> {
    const userId = this.getUserId();

    if (userId) {
      return this.http.get<User>(`${this.baseUrl}/users/${userId}`).pipe(
        map(user => user && user.role === 'admin'),
        catchError(error => throwError(error))
      );
    }

    return of(false);
  }


  logout(): void {
    localStorage.removeItem('userId');
  }
}
