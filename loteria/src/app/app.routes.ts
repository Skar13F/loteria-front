import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';


export const routes: Routes = [
    //{path: 'chat/:userId', component: ChatComponent}
    {path: '', component: ChatComponent}//ruta inicial para conectarse
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  