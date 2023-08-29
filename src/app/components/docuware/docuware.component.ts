import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Injectable,inject } from '@angular/core';
import{ Router } from '@angular/router';
import { DocuwareService } from 'src/app/services/docuware.service';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-docuware',
  templateUrl: './docuware.component.html',
  styleUrls: ['./docuware.component.scss'],
  providers: [MessageService]
})


export class DocuwareComponent implements OnInit{
  @ViewChild('fileUploadComponent') fileUploadComponent!: FileUpload;
  fileForm: FormGroup;
  isloading: boolean=true;
  thumbnail: any;
  isImage: boolean =false;
  filteredDocument: any[] = [];
  searchTerm = '';
  perPage = 10; 
  totalDocuments = 0;
  currentPage = 1;

  
  private httpClient=inject(HttpClient);
  baseUrlC: string="https://localhost:7230/";
  filetoUpload: any;
  files: any[] = [];
  fecha!: string;
  constructor(private sanitizer:DomSanitizer, private messageService: MessageService, private router: Router,  private _docuwareService: DocuwareService,private _fb: FormBuilder){
    this.fileForm=this._fb.group({
      altText: [''],
      description: [''],
    })
  }

  ngOnInit(): void {
   this.getAllFiles();
    this.fecha=formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }

  showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Proceso realizado correctamente' });
    }

  showFailure() {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Ops algo salio mal' });
   }


  
getAllFiles() {
  this._docuwareService.getFileList().pipe(
    finalize(() => {
      console.log("Datos Actualizados");
    })
  ).subscribe({
    next: (res) => {
      console.log(res);
      this.files = res;
      this.totalDocuments = this.files.length;
      this.filterDocuments();
      this.isloading=false;

    //  res.forEach((element: { id: number; contentType: string; }) => {
    //      this.getPreview(element.id,element.contentType);  
    //  });

    },
    error: (err) => {
      console.log(err);
      this.isloading=false;
    }
  });
}

/*arrayBufferToBase64(buffer, type, fileName) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const file = window.btoa(binary);
    const mimType = type === 'pdf' ? 'application/pdf' : type === 'xlsx' ? 'application/xlsx' : type === 'pptx' ? 'application/pptx' : type === 'csv' ? 'application/csv' : type === 'docx' ? 'application/docx' : type === 'jpg' ? 'application/jpg' : type === 'png' ? 'application/png' : '';

    const url = `data:${mimType};base64,` + file;
   this.SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  }*/

filterDocuments(): void {
  if (this.searchTerm === '') {
    this.filteredDocument = this.files.slice(0, this.perPage);
  } else {
    this.filteredDocument = this.files.filter(file =>
      file.fileName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

onPageChange(event: any): void {
  this.currentPage = event.page + 1; // event.page es 0 indexado
  const startIndex = this.currentPage * this.perPage - this.perPage;
  const endIndex = startIndex + this.perPage;
  this.filteredDocument = this.files.slice(startIndex, endIndex);
}

  handleFileInput(e: any) {
    this.filetoUpload = e?.target?.files[0];
  }

  public onSelectFile(evt: any) {
    this.filetoUpload = evt[0];
 }


  saveFileInfo() {
    const formData: FormData = new FormData();
    formData.append('MyFile', this.filetoUpload);
    formData.append('altText', this.fileForm.value.altText);
    formData.append('description', this.fileForm.value.description);
    this.isloading=true;

    this._docuwareService.uploadFile(formData).pipe(
      finalize(() => {
        this.getAllFiles();
      })
    ).subscribe({
      next: (res) => {
        console.log(res); 
        this.fileForm.reset();
        this.clearFileUpload();
        this.isloading=false;
        this.showSuccess();
      },
      error: (err) => {
          this.isloading=false;
          this.showFailure();
        console.log("Error catch: " + err);
      }
    });
  }
 
  downloadFile(id: number, contentType: string){
    try {
      this._docuwareService.downloadFile(id).subscribe((res: Blob)=>{
        const blob = new Blob([res], { type: contentType });
        const url= window.URL.createObjectURL(blob);
        window.open(url);
        console.log("Documento descargado con exito!");
      });
    } catch (error) {
      console.log(error);
    }
 
  }

  
getPreview(id:number, contentType:string){
      this._docuwareService.getPreviews(id).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: contentType });
        const url= this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        return url
        },
        (error) => {
          console.error('Error fetching document', error);
        }
      );
}

  clearFileUpload() {
    // Limpia el componente de carga de archivos
    this.fileUploadComponent.clear();
  }

  send(){
    this.router.navigate(['/'])
  }
  
}
