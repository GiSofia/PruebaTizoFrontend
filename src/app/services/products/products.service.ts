import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/app/environments/enviroments';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getProduct():Observable<Product[]>{

    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductCount(): Observable<number> {
    return this.getProduct().pipe(
      map(products => products.length)
    );
  }

  getActiveProductCount(): Observable<number> {
    return this.getProduct().pipe(
      map(products => products.filter(product => product.isActive).length)
    );
  }


  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product>{
    if(!product.id) throw Error('Product is required');
    return this.http.put<Product>(`${this.baseUrl}/products/${product.id}`, product);
  }

   deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<Product>(`${this.baseUrl}/products/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error deleting product:', err);
          return of(false);
        }),
        map(resp => true)
      );
  }
}
