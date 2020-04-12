import { PokemonType } from './PokemonType';

import { Statistic } from './Statistic';

import { Movement } from './Movement';

export class Pokemon {
   id: number;
   name: String;
   level: number;
   experience: number;
   next_level: number;
   pokedex_kanto_id: number;
   pokedex_national_id: String;
   user_id: number;
   pokemon_types_on_pokemon: PokemonType[];
   statistics_on_pokemon: Statistic[];
   nature_id: number;
   ability_id: number;
   movements_on_pokemon: Movement[];
   constructor() {
      this.pokemon_types_on_pokemon = [];
      this.statistics_on_pokemon = [];
      this.movements_on_pokemon = [];
   }
}