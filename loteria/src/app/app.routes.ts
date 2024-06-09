import { Routes } from '@angular/router';
import path from 'path';
import { CrearServidorComponent } from './crear-servidor/crear-servidor.component';
import { BuscarServidorComponent } from './buscar-servidor/buscar-servidor.component';


export const routes: Routes = [
    { path: 'crear-servidor', component:CrearServidorComponent },
    { path: 'buscar-servidor', component: BuscarServidorComponent },
   
];;
