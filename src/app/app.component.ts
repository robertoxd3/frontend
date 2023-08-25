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
   sidebarVisible = false;
  ngOnInit() {
      this.items = [
          {
              label: 'Inicio',
              routerLink: '/',
              icon: 'pi pi-fw pi-home',
          },
    {
              label: 'Formulario',
              routerLink: '/formulario',
              icon: 'pi pi-fw pi-code',
          },
              {
              label: 'Un Doc',
              routerLink: '/unico',
              icon: 'pi pi-fw pi-copy',
          },
              {
              label: 'Docuware',
              routerLink: '/docuware',
              icon: 'pi pi-fw pi-cog',
          },
      ];

  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }


 

}


