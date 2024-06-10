import { Routes } from '@angular/router';
import { CrearServidorComponent } from './crear-servidor/crear-servidor.component';
import { BuscarServidorComponent } from './buscar-servidor/buscar-servidor.component';
import { PrincipalComponent } from './principal/principal.component';
import { TableroComponent } from './tablero/tablero.component';



export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'crear', component: CrearServidorComponent },
  { path: 'buscar', component: BuscarServidorComponent },
  { path: 'tablero',component:TableroComponent},

];
