import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { BaliseComponent } from './pages/balise/balise.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'evenements', component: EvenementComponent },
  { path: 'balises', component: BaliseComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
