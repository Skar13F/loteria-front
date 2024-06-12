import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../loteria/home/home.component';
import { CreateServerComponent } from '../loteria/create-server/create-server.component';
import { SearchServerComponent } from '../loteria/search-server/search-server.component';
import { LotteryGameComponent } from '../loteria/lottery-game/lottery-game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-server', component: CreateServerComponent },
  { path: 'search-server', component: SearchServerComponent },
  { path: 'lottery-game', component: LotteryGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
