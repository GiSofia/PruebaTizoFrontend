import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }
}
