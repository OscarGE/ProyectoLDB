import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Provider } from '../../models/Provider'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  getProviders(): Observable<Provider>{
    return this.http.get(`${this.API_URI}/providers`)
  }
  getProvider(id: string): Observable<Provider>{
    return this.http.get(`${this.API_URI}/providers/${id}`);
  }
  deleteProvider(id: string): Observable<Provider>{
    return this.http.delete(`${this.API_URI}/providers/${id}`);
  }
   saveProvider(provider: Provider): Observable<Provider>{  
    return this.http.post(`${this.API_URI}/providers/`, provider);
  }
  updateProvider(id: string, updateProvider: Provider): Observable<Provider>{
    return this.http.put(`${this.API_URI}/providers/${id}`, updateProvider);
  }
  verifyProvider(name: string){
    return this.http.get(`${this.API_URI}/providers/verify-isExistProvider/${name}`);
  }
}