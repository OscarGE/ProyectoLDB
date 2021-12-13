import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../../models/Sale'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }
  getSales(id_user: string): Observable<Sale>{
    return this.http.get(`${this.API_URI}/sales/list/${id_user}`)
  }
  getSale(id: string): Observable<Sale>{
    return this.http.get(`${this.API_URI}/sales/one/${id}`);
  }
  deleteSale(id: string): Observable<Sale>{
    return this.http.delete(`${this.API_URI}/sales/${id}`);
  }
  saveSale(sale: Sale): Observable<Sale>{  
    return this.http.post(`${this.API_URI}/sales/`, sale);
  }
  updateSale(id: string, updateSale: Sale): Observable<Sale>{
    return this.http.put(`${this.API_URI}/sales/${id}`, updateSale);
  }
}
