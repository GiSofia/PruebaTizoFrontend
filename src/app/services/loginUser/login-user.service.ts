import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/app/environments/enviroments';
import { LoginUser } from 'src/app/interfaces/loginUser.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  addLoginUser(loginUser: LoginUser) {
    return this.http.post<LoginUser>(`${this.baseUrl}/loginUser`,loginUser);
  }

  updateLoginUser(loginUser: LoginUser) {
    return this.http.put<LoginUser>(`${this.baseUrl}/loginUser/${loginUser.id}`, loginUser);
  }
}
