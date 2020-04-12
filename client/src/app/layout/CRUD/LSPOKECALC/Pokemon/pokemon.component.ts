import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PokemonService } from './../../../../services/CRUD/LSPOKECALC/pokemon.service';
import { Pokemon } from './../../../../models/LSPOKECALC/Pokemon';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';

import { PokemonTypeService } from './../../../../services/CRUD/LSPOKECALC/pokemontype.service';
import { PokemonType } from './../../../../models/LSPOKECALC/PokemonType';

import { StatisticService } from './../../../../services/CRUD/LSPOKECALC/statistic.service';
import { Statistic } from './../../../../models/LSPOKECALC/Statistic';

import { NatureService } from './../../../../services/CRUD/LSPOKECALC/nature.service';
import { Nature } from './../../../../models/LSPOKECALC/Nature';

import { AbilityService } from './../../../../services/CRUD/LSPOKECALC/ability.service';
import { Ability } from './../../../../models/LSPOKECALC/Ability';

import { MovementService } from './../../../../services/CRUD/LSPOKECALC/movement.service';
import { Movement } from './../../../../models/LSPOKECALC/Movement';


@Component({
   selector: 'app-pokemon',
   templateUrl: './pokemon.component.html',
   styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
   pokemons: Pokemon[] = [];
   pokemonSelected: Pokemon = new Pokemon();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   pokemon_types: PokemonType[] = [];
   pokemon_types_pokemonSelectedId: number;
   statistics: Statistic[] = [];
   statistics_pokemonSelectedId: number;
   natures: Nature[] = [];
   abilities: Ability[] = [];
   movements: Movement[] = [];
   movements_pokemonSelectedId: number;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private pokemon_typeDataService: PokemonTypeService,
               private statisticDataService: StatisticService,
               private natureDataService: NatureService,
               private abilityDataService: AbilityService,
               private movementDataService: MovementService,
               private pokemonDataService: PokemonService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
      this.getPokemonType();
      this.getStatistic();
      this.getNature();
      this.getAbility();
      this.getMovement();
   }

   selectPokemon(pokemon: Pokemon) {
      this.pokemonSelected = pokemon;
   }

   getUser() {
      this.users = [];
      this.userDataService.get().then( r => {
         this.users = r as User[];
      }).catch( e => console.log(e) );
   }

   getPokemonType() {
      this.pokemon_types = [];
      this.pokemon_typeDataService.get().then( r => {
         this.pokemon_types = r as PokemonType[];
      }).catch( e => console.log(e) );
   }

   getPokemonTypesOnPokemon() {
      this.pokemonSelected.pokemon_types_on_pokemon = [];
      this.pokemonDataService.get(this.pokemonSelected.id).then( r => {
         this.pokemonSelected.pokemon_types_on_pokemon = r.attach[0].pokemon_types_on_pokemon as PokemonType[];
      }).catch( e => console.log(e) );
   }

   getStatistic() {
      this.statistics = [];
      this.statisticDataService.get().then( r => {
         this.statistics = r as Statistic[];
      }).catch( e => console.log(e) );
   }

   getStatisticsOnPokemon() {
      this.pokemonSelected.statistics_on_pokemon = [];
      this.pokemonDataService.get(this.pokemonSelected.id).then( r => {
         this.pokemonSelected.statistics_on_pokemon = r.attach[0].statistics_on_pokemon as Statistic[];
      }).catch( e => console.log(e) );
   }

   getNature() {
      this.natures = [];
      this.natureDataService.get().then( r => {
         this.natures = r as Nature[];
      }).catch( e => console.log(e) );
   }

   getAbility() {
      this.abilities = [];
      this.abilityDataService.get().then( r => {
         this.abilities = r as Ability[];
      }).catch( e => console.log(e) );
   }

   getMovement() {
      this.movements = [];
      this.movementDataService.get().then( r => {
         this.movements = r as Movement[];
      }).catch( e => console.log(e) );
   }

   getMovementsOnPokemon() {
      this.pokemonSelected.movements_on_pokemon = [];
      this.pokemonDataService.get(this.pokemonSelected.id).then( r => {
         this.pokemonSelected.movements_on_pokemon = r.attach[0].movements_on_pokemon as Movement[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPokemons();
   }

   getPokemons() {
      this.pokemons = [];
      this.pokemonSelected = new Pokemon();
      this.pokemonSelected.user_id = 0;
      this.pokemon_types_pokemonSelectedId = 0;
      this.statistics_pokemonSelectedId = 0;
      this.pokemonSelected.nature_id = 0;
      this.pokemonSelected.ability_id = 0;
      this.movements_pokemonSelectedId = 0;
      this.pokemonDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.pokemons = r.data as Pokemon[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPokemon(content) {
      this.pokemonSelected = new Pokemon();
      this.pokemonSelected.user_id = 0;
      this.pokemon_types_pokemonSelectedId = 0;
      this.statistics_pokemonSelectedId = 0;
      this.pokemonSelected.nature_id = 0;
      this.pokemonSelected.ability_id = 0;
      this.movements_pokemonSelectedId = 0;
      this.openDialog(content);
   }

   editPokemon(content) {
      if ( typeof this.pokemonSelected.pokemon_types_on_pokemon === 'undefined' ) {
         this.pokemonSelected.pokemon_types_on_pokemon = [];
      }
      if ( typeof this.pokemonSelected.statistics_on_pokemon === 'undefined' ) {
         this.pokemonSelected.statistics_on_pokemon = [];
      }
      if ( typeof this.pokemonSelected.movements_on_pokemon === 'undefined' ) {
         this.pokemonSelected.movements_on_pokemon = [];
      }
      if (typeof this.pokemonSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.getPokemonTypesOnPokemon();
      this.pokemon_types_pokemonSelectedId = 0;
      this.getStatisticsOnPokemon();
      this.statistics_pokemonSelectedId = 0;
      this.getMovementsOnPokemon();
      this.movements_pokemonSelectedId = 0;
      this.openDialog(content);
   }

   deletePokemon() {
      if (typeof this.pokemonSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.pokemonDataService.delete(this.pokemonSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPokemons();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.pokemonDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Pokemons.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.pokemonDataService.get().then( r => {
         const backupData = r as Pokemon[];
         let output = 'id;name;level;experience;next_level;pokedex_kanto_id;pokedex_national_id;user_id;nature_id;ability_id\n';
         backupData.forEach(element => {
            output += element.id + ';' + element.name + ';' + element.level + ';' + element.experience + ';' + element.next_level + ';' + element.pokedex_kanto_id + ';' + element.pokedex_national_id + ';' + element.user_id + ';' + element.nature_id + ';' + element.ability_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Pokemons.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.pokemonDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   selectPokemonType(pokemon_type: PokemonType) {
      this.pokemon_types_pokemonSelectedId = pokemon_type.id;
   }

   addPokemonType() {
      if (this.pokemon_types_pokemonSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.pokemon_types.forEach(pokemon_type => {
         if (pokemon_type.id == this.pokemon_types_pokemonSelectedId) {
            let existe = false;
            this.pokemonSelected.pokemon_types_on_pokemon.forEach(element => {
               if (element.id == pokemon_type.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.pokemonSelected.pokemon_types_on_pokemon.push(pokemon_type);
               this.pokemon_types_pokemonSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removePokemonType() {
      if (this.pokemon_types_pokemonSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newPokemonTypes: PokemonType[] = [];
      let eliminado = false;
      this.pokemonSelected.pokemon_types_on_pokemon.forEach(pokemon_type => {
         if (pokemon_type.id !== this.pokemon_types_pokemonSelectedId) {
            newPokemonTypes.push(pokemon_type);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.pokemonSelected.pokemon_types_on_pokemon = newPokemonTypes;
      this.pokemon_types_pokemonSelectedId = 0;
   }

   selectStatistic(statistic: Statistic) {
      this.statistics_pokemonSelectedId = statistic.id;
   }

   addStatistic() {
      if (this.statistics_pokemonSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.statistics.forEach(statistic => {
         if (statistic.id == this.statistics_pokemonSelectedId) {
            let existe = false;
            this.pokemonSelected.statistics_on_pokemon.forEach(element => {
               if (element.id == statistic.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.pokemonSelected.statistics_on_pokemon.push(statistic);
               this.statistics_pokemonSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removeStatistic() {
      if (this.statistics_pokemonSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newStatistics: Statistic[] = [];
      let eliminado = false;
      this.pokemonSelected.statistics_on_pokemon.forEach(statistic => {
         if (statistic.id !== this.statistics_pokemonSelectedId) {
            newStatistics.push(statistic);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.pokemonSelected.statistics_on_pokemon = newStatistics;
      this.statistics_pokemonSelectedId = 0;
   }

   selectMovement(movement: Movement) {
      this.movements_pokemonSelectedId = movement.id;
   }

   addMovement() {
      if (this.movements_pokemonSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.movements.forEach(movement => {
         if (movement.id == this.movements_pokemonSelectedId) {
            let existe = false;
            this.pokemonSelected.movements_on_pokemon.forEach(element => {
               if (element.id == movement.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.pokemonSelected.movements_on_pokemon.push(movement);
               this.movements_pokemonSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removeMovement() {
      if (this.movements_pokemonSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newMovements: Movement[] = [];
      let eliminado = false;
      this.pokemonSelected.movements_on_pokemon.forEach(movement => {
         if (movement.id !== this.movements_pokemonSelectedId) {
            newMovements.push(movement);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.pokemonSelected.movements_on_pokemon = newMovements;
      this.movements_pokemonSelectedId = 0;
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.pokemonSelected.id === 'undefined') {
               this.pokemonDataService.post(this.pokemonSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPokemons();
               }).catch( e => console.log(e) );
            } else {
               this.pokemonDataService.put(this.pokemonSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPokemons();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}