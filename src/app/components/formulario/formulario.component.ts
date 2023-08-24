import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
//import { UploadEvent } from 'primeng/fileupload';
import {FormularioService} from '../../services/formulario.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [MessageService]
})




export class FormularioComponent implements OnInit {
  loading :boolean=false;
  formData = {
    nombre: '',
    tipo: ''
  };

  myForm: FormGroup;
  documents: any;
  visible: boolean = false;

  constructor(private messageService: MessageService,private _formularioService: FormularioService,private _fb: FormBuilder)
  {
    this.myForm=this._fb.group({
      nombre: ['',Validators.required],
      tipo: ['',Validators.required],
    })
  }
  
 onUpload(event: UploadEvent){
  this.messageService.add({severity:'info', summary:'Success',detail:'File Uploaded with Basic Mode'});
 }
 
 onFileUpload(event: any){
  for(const file of event.files)
  console.log(file)
 }

 ngOnInit(): void {
  this.getDocumentList();

 }


 showDialog() {
     this.visible = true;
 }
 

 getDocumentList() {
  this._formularioService.getDocumentList().subscribe({
    next: (res) => {
      console.log(res);
      this.documents=res;
    },
    error: (err) => {
      console.log(err);
    }
  })
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
      this.getDocumentList();
    },
    error: console.log,
  })
}

submitForm(form: any) {
  if (form.valid) {
    this.loading = true;
    this._formularioService.insertDocument(this.myForm.value).subscribe({
      next: (res) => {
        console.log('Datos insertados:', res);
        alert('Datos insertados correctamente');
        this.getDocumentList();
        this.loading = false;
        this.visible = false;
      },
      error: (err) => {
        console.error('Error al insertar datos:', err);
      }
    });
   
  }
  }

}
 
