import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private httpClient=inject(HttpClient);
    private baseUrl: string;
    constructor() { 
      this.baseUrl="https://localhost:7230/api/Auth";
    }

    loginUser(data: any): Observable<any> {
      return this.httpClient.post(this.baseUrl, data);
    }

    
   
}
