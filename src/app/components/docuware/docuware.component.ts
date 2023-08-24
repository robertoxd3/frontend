import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Injectable,inject } from '@angular/core';
import{ Router } from '@angular/router';
import { DocuwareService } from 'src/app/services/docuware.service';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'primeng/fileupload';
import { SafePipeModule } from 'safe-pipe';

@Component({
  selector: 'app-docuware',
  templateUrl: './docuware.component.html',
  styleUrls: ['./docuware.component.scss']
})


export class DocuwareComponent implements OnInit{
  @ViewChild('fileUploadComponent') fileUploadComponent!: FileUpload;
  fileForm: FormGroup;
  isloading: boolean=true;
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
  constructor( private router: Router,  private _docuwareService: DocuwareService,private _fb: FormBuilder){
    this.fileForm=this._fb.group({
      altText: [''],
      description: [''],
    })
  }

  ngOnInit(): void {
   // this.getAllFiles();
   this.getAllFiles();
    this.fecha=formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }

  // getAllFiles(){
  //   this._docuwareService.getFileList().subscribe({
  //     next: (res)=>{
  //       console.log(res);
  //       this.files= res;
  //     },error(err) {
  //       console.log(err);
  //     },
  //   })
  // }

  

  
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
    },
    error: (err) => {
      console.log(err);
      this.isloading=false;
    }
  });
}

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

  // saveFileInfo(){
  //   const formData: FormData= new FormData();
  //   formData.append('MyFile', this.filetoUpload);
  //   formData.append('altText', this.fileForm.value.altText);
  //   formData.append('description', this.fileForm.value.description);
    
  //   this._docuwareService.uploadFile(formData).subscribe({
  //     next(res) {
  //       alert("Archivo Subido correctamente")
  //       console.log(res); 
        
  //     },error(err) {
  //         console.log("Error catch: "+err);
  //     },
  //   })
  //   /*return this.httpClient.post('https://localhost:7230/FileManager', formData,
  //   {
  //     headers : new HttpHeaders()})
  //   .subscribe(() => alert("File uploaded"));*/
  // }

  saveFileInfo() {
    const formData: FormData = new FormData();
    formData.append('MyFile', this.filetoUpload);
    formData.append('altText', this.fileForm.value.altText);
    formData.append('description', this.fileForm.value.description);
    
    this._docuwareService.uploadFile(formData).pipe(
      finalize(() => {
        this.getAllFiles();
      })
    ).subscribe({
      next: (res) => {
        alert("Archivo Subido correctamente");
        console.log(res); 
        this.fileForm.reset();
        this.clearFileUpload();
      },
      error: (err) => {
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

  clearFileUpload() {
    // Limpia el componente de carga de archivos
    this.fileUploadComponent.clear();
  }

  send(){
    this.router.navigate(['/'])
  }
  
}
