import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TableroComponent } from './components/tablero/tablero.component';

export const routes: Routes = [
    //{path: 'chat/:userId', component: ChatComponent}
    { path: '', component: PrincipalComponent},//ruta inicial para conectarse
    { path: 'unirse', component: ChatComponent},
    { path: 'tablero/:roomId',component:TableroComponent},

];
 