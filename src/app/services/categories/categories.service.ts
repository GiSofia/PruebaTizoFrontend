import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(category: Category): Observable<Category>{
    if(!category.id) throw Error('Category is required');
    return this.http.put<Category>(`${this.baseUrl}/categories/${category.id}`, category);
  }

   deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<Category>(`${this.baseUrl}/categories/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error deleting category:', err);
          return of(false);
        }),
        map(resp => true)
      );
  }

}
