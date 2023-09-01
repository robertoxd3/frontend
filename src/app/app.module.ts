import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormularioComponent } from './components/formulario/formulario.component';
import { MenubarModule } from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DocuwareComponent } from './components/docuware/docuware.component';
import { TabViewModule } from 'primeng/tabview';
import { UploadComponent } from './components/upload/upload.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { SafePipeModule } from 'safe-pipe';
import { PaginatorModule } from 'primeng/paginator';
import { PrototipoComponent } from './components/prototipo/prototipo.component';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { PrototipoService } from './services/prototipo.service';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    DocuwareComponent,
    UploadComponent,
    PrototipoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    FileUploadModule,
    ToastModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ProgressSpinnerModule,
    TabViewModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DropdownModule,
    DividerModule,
    MessagesModule,
    SafePipeModule ,
    PaginatorModule,
    TagModule,
    SliderModule,
    SplitButtonModule,
    
  ],
  providers: [PrototipoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
