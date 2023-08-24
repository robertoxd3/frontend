import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private httpClient=inject(HttpClient);
  private baseUrl: string;
  constructor() { 
    this.baseUrl="https://localhost:7230/api/Document";
  }
  getDocumentList(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
  insertDocument(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }
  updateDocument(id:number ,data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl, data);
  }
  deleteDocument(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getDocumentById(id: number): Observable<any> {
    const token= this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.baseUrl}/${id}`,{headers});
  }

  getToken(): any {

    return localStorage.getItem('loginToken') || '{}';
  }
  
}
