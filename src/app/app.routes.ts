import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { BaliseComponent } from './pages/balise/balise.component';
import { MeteoComponent } from './pages/meteo/meteo.component';
import { PartenairesComponent } from './pages/partenaires/partenaires.component';
import { GaleriesComponent } from './components/galeries/galeries.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BureauComponent } from './pages/bureau/bureau.component';


export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'evenements', component: EvenementComponent },
  { path: 'balises', component: BaliseComponent },
  { path: 'meteo', component: MeteoComponent },
  { path: 'partenaires', component: PartenairesComponent },
  { path: 'bureau', component: BureauComponent },
  { path: 'galeries/:year', component: GaleriesComponent }, // Route dynamique pour une année spécifique
  { path: 'galeries', component: GaleriesComponent }, // Page galerie principale
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
