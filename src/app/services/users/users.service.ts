import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { environments } from 'src/app/environments/enviroments';

@Injectable({providedIn: 'root'})
export class UsersService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getUser():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }


  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(user: User): Observable<User>{
    if(!user.id) throw Error('User is required');
    return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<boolean> {
  return this.http.delete<User>(`${this.baseUrl}/users/${id}`)
    .pipe(
      catchError(err => {
        console.error('Error deleting user:', err);
        return of(false);
      }),
      map(resp => true)
    );
  }

}
