import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'loteria';
}