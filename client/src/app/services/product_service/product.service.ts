import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }
  getProducts(id_user: string): Observable<Product>{
    return this.http.get(`${this.API_URI}/products/list/${id_user}`)
  }
  geProduct(id: string): Observable<Product>{
    return this.http.get(`${this.API_URI}/products/one/${id}`);
  }
  deleteProduct(id: string): Observable<Product>{
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }
   saveProduct(product: Product): Observable<Product>{  
    return this.http.post(`${this.API_URI}/products/`, product);
  }
  updateProduct(id: string, updateProduct: Product): Observable<Product>{
    return this.http.put(`${this.API_URI}/products/${id}`, updateProduct);
  }
  providersList(id_user: string): Observable<Product>{
    return this.http.post(`${this.API_URI}/products/get-providersList/${id_user}`,null);
  }
  categoriesList(): Observable<Product>{
    return this.http.post(`${this.API_URI}/products/get-categoriesList`,null);
  }
}
