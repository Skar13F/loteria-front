
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-crear-servidor',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    RouterLink,
    RouterOutlet],
  templateUrl: './crear-servidor.component.html',
  styleUrl: './crear-servidor.component.css'
})
export class CrearServidorComponent {

}
