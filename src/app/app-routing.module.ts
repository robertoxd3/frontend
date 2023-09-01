import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { DocuwareComponent } from './components/docuware/docuware.component';
import { UploadComponent } from './components/upload/upload.component';
import { PrototipoComponent } from './components/prototipo/prototipo.component';

const routes: Routes = [
  { path: 'formulario', component: FormularioComponent },
  { path: 'unico', component: UploadComponent },
  { path: 'docuware', component: DocuwareComponent },
    { path: 'prototipo', component: PrototipoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
