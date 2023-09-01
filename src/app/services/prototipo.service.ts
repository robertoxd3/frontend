import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PrototipoService {
    baseUrl: string;
     private httpClient=inject(HttpClient);

  

    constructor(private http: HttpClient) {
        this.baseUrl="http://localhost:5079/api/Docuware/"
    }
    
    getDocuments(): Observable<any> {
        return this.httpClient.get(this.baseUrl+"ObtenerDocumentos");
    }
    
    // getDocumentsMini() {
    //      return Promise.resolve(this.getDocuments().subscribe((result) => {
    //          return result.slice(0,5);
    //      }));
    // }

    //  getDocumentsLarge() {
    //       return Promise.resolve(this.getDocuments().subscribe((result) => {
    //          return result.slice(0,200);
    //      }));
    // }
}



