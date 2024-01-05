import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/enviroments';
import { Category } from 'src/app/interfaces/category.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient) { }

  getCategory():Observable<Category[]>{

    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

}
