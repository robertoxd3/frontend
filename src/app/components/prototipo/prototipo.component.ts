import { Component ,OnInit} from '@angular/core';
import { PrototipoService } from '../../services/prototipo.service';
import { Document } from '../../domain/DocuwareDoc';
import { finalize } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-prototipo',
  templateUrl: './prototipo.component.html',
  styleUrls: ['./prototipo.component.scss'],
})
export class PrototipoComponent implements OnInit {
       //customers!: Customer[];

    // selectedCustomers!: Customer[];
    // representatives!: Representative[];
    // statuses!: any[];

    documents!: Document[];
    selectedDocuments!: Document[];
    items: MenuItem[];
    loading: boolean = true;
  
    activityValues: number[] = [0, 100];

    constructor( private prototipeService: PrototipoService) {
       this.items = [
            {
                label: 'FILTROS',
                icon: 'pi pi-filter',
                command: () => {
                    //this.update();
                }
            },
        ];
    }

    ngOnInit() {
        this.loading = true;
        this.getAllFiles();
    }
    add(){
      
    }
    getAllFiles() {
  this.prototipeService.getDocuments().pipe(
    finalize(() => {
      console.log("Datos Actualizados");
    })
  ).subscribe({
    next: (res) => {
      console.log(res);
      this.documents=res.Datos;
      this.loading=false;
           /*this.documents = JSON.parse(JSON.stringify(res.Datos));
      this.selectedDocuments = this.documents;*/
    },
    error: (err) => {
      console.log(err);
      this.loading=false;
    }
  });
}

}
