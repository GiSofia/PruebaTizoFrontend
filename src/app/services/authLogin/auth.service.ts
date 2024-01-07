import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from 'src/app/environments/enviroments';
import { LoginUser } from 'src/app/interfaces/loginUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginUser> {
    return this.http.get<LoginUser[]>(`${this.baseUrl}/loginUser?email=${email}&password=${password}`).pipe(
      map(users => users[0]),
      catchError(error => throwError(error))
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

  logout(): void {
    localStorage.removeItem('userId');
  }
}
