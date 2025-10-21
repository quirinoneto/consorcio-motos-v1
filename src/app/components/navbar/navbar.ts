import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar'; // Importe o módulo da Toolbar
import { ButtonModule } from 'primeng/button';   // Importe o módulo de Botões
import { RouterLink, RouterLinkActive } from '@angular/router';     // Para navegação

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule, 
    ToolbarModule, // Disponibiliza a tag <p-toolbar>
    ButtonModule,  // Disponibiliza a tag <p-button>
    RouterLink ,    // Disponibiliza a diretiva routerLink
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
