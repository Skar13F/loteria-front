import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { TableroComponent } from './components/tablero/tablero.component';

export const routes: Routes = [
    //{path: 'chat/:userId', component: ChatComponent}
    { path: '', component: ChatComponent},//ruta inicial para conectarse
    { path: 'tablero',component:TableroComponent},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  

