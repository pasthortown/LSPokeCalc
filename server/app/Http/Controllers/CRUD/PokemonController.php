<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Pokemon;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PokemonController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Pokemon::get(),200);
       } else {
          $pokemon = Pokemon::findOrFail($id);
          $attach = [];
          $pokemon_types_on_pokemon = $pokemon->PokemonTypes()->get();
          array_push($attach, ["pokemon_types_on_pokemon"=>$pokemon_types_on_pokemon]);
          $statistics_on_pokemon = $pokemon->Statistics()->get();
          array_push($attach, ["statistics_on_pokemon"=>$statistics_on_pokemon]);
          $movements_on_pokemon = $pokemon->Movements()->get();
          array_push($attach, ["movements_on_pokemon"=>$movements_on_pokemon]);
          return response()->json(["Pokemon"=>$pokemon, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Pokemon::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $pokemon = new Pokemon();
          $lastPokemon = Pokemon::orderBy('id')->get()->last();
          if($lastPokemon) {
             $pokemon->id = $lastPokemon->id + 1;
          } else {
             $pokemon->id = 1;
          }
          $pokemon->name = $result['name'];
          $pokemon->level = $result['level'];
          $pokemon->experience = $result['experience'];
          $pokemon->next_level = $result['next_level'];
          $pokemon->pokedex_kanto_id = $result['pokedex_kanto_id'];
          $pokemon->pokedex_national_id = $result['pokedex_national_id'];
          $pokemon->user_id = $result['user_id'];
          $pokemon->nature_id = $result['nature_id'];
          $pokemon->ability_id = $result['ability_id'];
          $pokemon->save();
          $pokemon_types_on_pokemon = $result['pokemon_types_on_pokemon'];
          foreach( $pokemon_types_on_pokemon as $pokemon_type) {
             $pokemon->PokemonTypes()->attach($pokemon_type['id']);
          }
          $statistics_on_pokemon = $result['statistics_on_pokemon'];
          foreach( $statistics_on_pokemon as $statistic) {
             $pokemon->Statistics()->attach($statistic['id']);
          }
          $movements_on_pokemon = $result['movements_on_pokemon'];
          foreach( $movements_on_pokemon as $movement) {
             $pokemon->Movements()->attach($movement['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($pokemon,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $pokemon = Pokemon::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'level'=>$result['level'],
             'experience'=>$result['experience'],
             'next_level'=>$result['next_level'],
             'pokedex_kanto_id'=>$result['pokedex_kanto_id'],
             'pokedex_national_id'=>$result['pokedex_national_id'],
             'user_id'=>$result['user_id'],
             'nature_id'=>$result['nature_id'],
             'ability_id'=>$result['ability_id'],
          ]);
          $pokemon = Pokemon::where('id',$result['id'])->first();
          $pokemon_types_on_pokemon = $result['pokemon_types_on_pokemon'];
          $pokemon_types_on_pokemon_old = $pokemon->PokemonTypes()->get();
          foreach( $pokemon_types_on_pokemon_old as $pokemon_type_old ) {
             $delete = true;
             foreach( $pokemon_types_on_pokemon as $pokemon_type ) {
                if ( $pokemon_type_old->id === $pokemon_type['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $pokemon->PokemonTypes()->detach($pokemon_type_old->id);
             }
          }
          foreach( $pokemon_types_on_pokemon as $pokemon_type ) {
             $add = true;
             foreach( $pokemon_types_on_pokemon_old as $pokemon_type_old) {
                if ( $pokemon_type_old->id === $pokemon_type['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $pokemon->PokemonTypes()->attach($pokemon_type['id']);
             }
          }
          $pokemon = Pokemon::where('id',$result['id'])->first();
          $statistics_on_pokemon = $result['statistics_on_pokemon'];
          $statistics_on_pokemon_old = $pokemon->Statistics()->get();
          foreach( $statistics_on_pokemon_old as $statistic_old ) {
             $delete = true;
             foreach( $statistics_on_pokemon as $statistic ) {
                if ( $statistic_old->id === $statistic['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $pokemon->Statistics()->detach($statistic_old->id);
             }
          }
          foreach( $statistics_on_pokemon as $statistic ) {
             $add = true;
             foreach( $statistics_on_pokemon_old as $statistic_old) {
                if ( $statistic_old->id === $statistic['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $pokemon->Statistics()->attach($statistic['id']);
             }
          }
          $pokemon = Pokemon::where('id',$result['id'])->first();
          $movements_on_pokemon = $result['movements_on_pokemon'];
          $movements_on_pokemon_old = $pokemon->Movements()->get();
          foreach( $movements_on_pokemon_old as $movement_old ) {
             $delete = true;
             foreach( $movements_on_pokemon as $movement ) {
                if ( $movement_old->id === $movement['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $pokemon->Movements()->detach($movement_old->id);
             }
          }
          foreach( $movements_on_pokemon as $movement ) {
             $add = true;
             foreach( $movements_on_pokemon_old as $movement_old) {
                if ( $movement_old->id === $movement['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $pokemon->Movements()->attach($movement['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($pokemon,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Pokemon::destroy($id);
    }

    function backup(Request $data)
    {
       $pokemons = Pokemon::get();
       $toReturn = [];
       foreach( $pokemons as $pokemon) {
          $attach = [];
          $pokemon_types_on_pokemon = $pokemon->PokemonTypes()->get();
          array_push($attach, ["pokemon_types_on_pokemon"=>$pokemon_types_on_pokemon]);
          $statistics_on_pokemon = $pokemon->Statistics()->get();
          array_push($attach, ["statistics_on_pokemon"=>$statistics_on_pokemon]);
          $movements_on_pokemon = $pokemon->Movements()->get();
          array_push($attach, ["movements_on_pokemon"=>$movements_on_pokemon]);
          array_push($toReturn, ["Pokemon"=>$pokemon, "attach"=>$attach]);
       }
       return response()->json($toReturn,200);
    }

    function masiveLoad(Request $data)
    {
      $incomming = $data->json()->all();
      $masiveData = $incomming['data'];
      try{
       DB::beginTransaction();
       foreach($masiveData as $row) {
         $result = $row['Pokemon'];
         $exist = Pokemon::where('id',$result['id'])->first();
         if ($exist) {
           Pokemon::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'level'=>$result['level'],
             'experience'=>$result['experience'],
             'next_level'=>$result['next_level'],
             'pokedex_kanto_id'=>$result['pokedex_kanto_id'],
             'pokedex_national_id'=>$result['pokedex_national_id'],
             'user_id'=>$result['user_id'],
             'nature_id'=>$result['nature_id'],
             'ability_id'=>$result['ability_id'],
           ]);
         } else {
          $pokemon = new Pokemon();
          $pokemon->id = $result['id'];
          $pokemon->name = $result['name'];
          $pokemon->level = $result['level'];
          $pokemon->experience = $result['experience'];
          $pokemon->next_level = $result['next_level'];
          $pokemon->pokedex_kanto_id = $result['pokedex_kanto_id'];
          $pokemon->pokedex_national_id = $result['pokedex_national_id'];
          $pokemon->user_id = $result['user_id'];
          $pokemon->nature_id = $result['nature_id'];
          $pokemon->ability_id = $result['ability_id'];
          $pokemon->save();
         }
         $pokemon = Pokemon::where('id',$result['id'])->first();
         $pokemon_types_on_pokemon = [];
         foreach($row['attach'] as $attach){
            $pokemon_types_on_pokemon = $attach['pokemon_types_on_pokemon'];
         }
         $pokemon_types_on_pokemon_old = $pokemon->PokemonTypes()->get();
         foreach( $pokemon_types_on_pokemon_old as $pokemon_type_old ) {
            $delete = true;
            foreach( $pokemon_types_on_pokemon as $pokemon_type ) {
               if ( $pokemon_type_old->id === $pokemon_type['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $pokemon->PokemonTypes()->detach($pokemon_type_old->id);
            }
         }
         foreach( $pokemon_types_on_pokemon as $pokemon_type ) {
            $add = true;
            foreach( $pokemon_types_on_pokemon_old as $pokemon_type_old) {
               if ( $pokemon_type_old->id === $pokemon_type['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $pokemon->PokemonTypes()->attach($pokemon_type['id']);
            }
         }
         $pokemon = Pokemon::where('id',$result['id'])->first();
         $statistics_on_pokemon = [];
         foreach($row['attach'] as $attach){
            $statistics_on_pokemon = $attach['statistics_on_pokemon'];
         }
         $statistics_on_pokemon_old = $pokemon->Statistics()->get();
         foreach( $statistics_on_pokemon_old as $statistic_old ) {
            $delete = true;
            foreach( $statistics_on_pokemon as $statistic ) {
               if ( $statistic_old->id === $statistic['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $pokemon->Statistics()->detach($statistic_old->id);
            }
         }
         foreach( $statistics_on_pokemon as $statistic ) {
            $add = true;
            foreach( $statistics_on_pokemon_old as $statistic_old) {
               if ( $statistic_old->id === $statistic['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $pokemon->Statistics()->attach($statistic['id']);
            }
         }
         $pokemon = Pokemon::where('id',$result['id'])->first();
         $movements_on_pokemon = [];
         foreach($row['attach'] as $attach){
            $movements_on_pokemon = $attach['movements_on_pokemon'];
         }
         $movements_on_pokemon_old = $pokemon->Movements()->get();
         foreach( $movements_on_pokemon_old as $movement_old ) {
            $delete = true;
            foreach( $movements_on_pokemon as $movement ) {
               if ( $movement_old->id === $movement['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $pokemon->Movements()->detach($movement_old->id);
            }
         }
         foreach( $movements_on_pokemon as $movement ) {
            $add = true;
            foreach( $movements_on_pokemon_old as $movement_old) {
               if ( $movement_old->id === $movement['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $pokemon->Movements()->attach($movement['id']);
            }
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}