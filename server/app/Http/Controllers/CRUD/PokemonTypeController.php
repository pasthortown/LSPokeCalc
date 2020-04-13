<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\PokemonType;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PokemonTypeController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(PokemonType::get(),200);
       } else {
          $pokemontype = PokemonType::findOrFail($id);
          $attach = [];
          return response()->json(["PokemonType"=>$pokemontype, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       try{
         return response()->json(PokemonType::paginate($size),200);
       } catch (Exception $e) {
         return response()->json(['data'=>[]],200);
       }
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $pokemontype = new PokemonType();
          $lastPokemonType = PokemonType::orderBy('id')->get()->last();
          if($lastPokemonType) {
             $pokemontype->id = $lastPokemonType->id + 1;
          } else {
             $pokemontype->id = 1;
          }
          $pokemontype->name = $result['name'];
          $pokemontype->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($pokemontype,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $pokemontype = PokemonType::where('id',$result['id'])->update([
             'name'=>$result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($pokemontype,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return PokemonType::destroy($id);
    }

    function backup(Request $data)
    {
       $pokemontypes = PokemonType::get();
       $toReturn = [];
       foreach( $pokemontypes as $pokemontype) {
          $attach = [];
          array_push($toReturn, ["PokemonType"=>$pokemontype, "attach"=>$attach]);
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
         $result = $row['PokemonType'];
         $exist = PokemonType::where('id',$result['id'])->first();
         if ($exist) {
           PokemonType::where('id', $result['id'])->update([
             'name'=>$result['name'],
           ]);
         } else {
          $pokemontype = new PokemonType();
          $pokemontype->id = $result['id'];
          $pokemontype->name = $result['name'];
          $pokemontype->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
