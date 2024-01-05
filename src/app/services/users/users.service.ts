import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { environments } from 'src/app/environments/enviroments';

@Injectable({providedIn: 'root'})
export class UsersService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getUser():Observable<User[]>{

    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

}
