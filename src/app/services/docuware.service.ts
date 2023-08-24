import { Injectable,inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocuwareService {

  private httpClient=inject(HttpClient);
  private baseUrl: string;
  constructor() { 
    this.baseUrl="https://localhost:7230/FileManager";
  }
  getFileList(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  downloadFile(id:number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`, {responseType: 'blob'});
  }

  
  uploadFile(formData :any): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient.post(this.baseUrl, formData, {headers});
  }




}
