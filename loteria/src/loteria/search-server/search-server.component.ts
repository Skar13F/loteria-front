import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-server',
  standalone: true,
  imports: [],
  templateUrl: './search-server.component.html',
  styleUrl: './search-server.component.css'
})
export class SearchServerComponent {
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
