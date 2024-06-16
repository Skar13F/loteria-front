
import { Component,  } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-buscar-servidor',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    FormsModule, 
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './buscar-servidor.component.html',
  styleUrl: './buscar-servidor.component.css'
})
export class BuscarServidorComponent {
  servers = [
    { name: 'Servidor 1' },
    { name: 'Servidor 2' },
    { name: 'Servidor 3' },
    { name: 'Servidor 4' },
    { name: 'Servidor 5' }
  ];

}
