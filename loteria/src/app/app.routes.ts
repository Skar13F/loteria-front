import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './components/tablero/tablero.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    //{path: 'chat/:userId', component: ChatComponent}
    { path: '', component: PrincipalComponent},//ruta inicial para conectarse
    { path: 'unirse', component: ChatComponent},
    { path: 'tablero',component:TableroComponent},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  

