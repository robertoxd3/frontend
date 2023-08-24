import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit,EventEmitter,Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';
import { LoginService } from 'src/app/services/login.service';
import * as jwtDecode from 'jwt-decode';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent  {

  visible: boolean = false;
  document!: any[];
  loginForm: FormGroup;
  messages!: Message[];

  idForm: FormGroup;
  showDialog() {
      this.visible = true;
  }

  addError() {
    this.messages = [{ severity: 'error', summary: 'Error', detail: 'No se encontro el documento!' }];
}
addSuccess(){
  this.messages = [{ severity: 'success', summary: 'Exitó', detail: 'Documento se encontro!' }];
}


  constructor(private _fb: FormBuilder, private cdr: ChangeDetectorRef , private _formularioService: FormularioService, private _loginService: LoginService){
    this.loginForm=this._fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
    })

    this.idForm=this._fb.group({
      id: ['',Validators.required],
    })
  }

  login(form: any){
    if (form.valid) {
      this._loginService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {

          localStorage.setItem('loginToken', res['jwtToken']);
          console.log("Logueado Correctamente\n Token: "+res['jwtToken']);
        },
        error: (err) => {
          console.error("Credenciales invalidas , no se pudo generar el token ",err);
        }
      });
     
    }
  }


  getDocumento(form: any) {
    if (form.valid) {
      this._formularioService.getDocumentById(this.idForm.value.id).subscribe({
        next: (res) => {
          console.log( res);
          this.document=Array(res);
          console.log(this.document);
          this.addSuccess();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener los datos:', err);
          this.addError();
        }
      });
     
    }
    }


    confirmDelete(id: number) {
      const result = window.confirm(`¿Estás seguro de que deseas eliminarlo"?`);
      if (result) {
        this.deleteDocumento(id);
      }
    }
    
    deleteDocumento(id: number) {
      this._formularioService.deleteDocument(id).subscribe({
        next: (res) => {
          console.log(res);
          alert('Documento fue eliminado correctamente');
        },
        error: console.log,
      })
    }
    
  // progress: number;
  // message: string;

  // @Output() public onUploadFinished = new EventEmitter();
  // constructor(private http: HttpClient){
  
  // }

  // ngOnInit() {
      
  // }

  // uploadFile=(files)=>{
  //   if(files.length===0){
  //     return ;
  //   }
  //   let fileToUpload= <File>files[0];
  //   const formData= new FormData();
  //   formData.append('file',fileToUpload,fileToUpload.name);

  //   this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe({
  //       next: (event) => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });
  }

