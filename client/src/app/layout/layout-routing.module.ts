import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },

         //LSPokeCalc

         {
            path: 'pokemon',
            loadChildren: './CRUD/LSPOKECALC/Pokemon/pokemon.module#PokemonModule'
         },
         {
            path: 'statistic',
            loadChildren: './CRUD/LSPOKECALC/Statistic/statistic.module#StatisticModule'
         },
         {
            path: 'statistic_type',
            loadChildren: './CRUD/LSPOKECALC/StatisticType/statistictype.module#StatisticTypeModule'
         },
         {
            path: 'pokemon_type',
            loadChildren: './CRUD/LSPOKECALC/PokemonType/pokemontype.module#PokemonTypeModule'
         },
         {
            path: 'ability',
            loadChildren: './CRUD/LSPOKECALC/Ability/ability.module#AbilityModule'
         },
         {
            path: 'movement',
            loadChildren: './CRUD/LSPOKECALC/Movement/movement.module#MovementModule'
         },
         {
            path: 'nature',
            loadChildren: './CRUD/LSPOKECALC/Nature/nature.module#NatureModule'
         },
         {
            path: 'advantage',
            loadChildren: './CRUD/LSPOKECALC/Advantage/advantage.module#AdvantageModule'
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}