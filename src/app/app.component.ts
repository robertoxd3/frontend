import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  data: any;
  items: MenuItem[] | undefined;
  messages: Message[] | undefined;
  constructor( private router: Router){}

  ngOnInit() {
      this.items = [
          {
              label: 'Inicio',
              routerLink: '/',
              icon: 'pi pi-fw pi-home',

          },

        //   {
        //       label: 'Quit',
        //       routerLink: '/',
        //       icon: 'pi pi-fw pi-power-off'
        //   }
      ];

  }

  send(){
    this.router.navigate(["/formulario"]);
  }

  send2(){
    this.router.navigate(["/unico"]);
  }
 
  send3(){
    this.router.navigate(["/docuware"]);
  }
 

}


