import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonTypeComponent } from './pokemontype.component';

const routes: Routes = [
   {
      path: '',
      component: PokemonTypeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PokemonTypeRoutingModule {}
