<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Advantage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdvantageController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Advantage::get(),200);
       } else {
          $advantage = Advantage::findOrFail($id);
          $attach = [];
          return response()->json(["Advantage"=>$advantage, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Advantage::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $advantage = new Advantage();
          $lastAdvantage = Advantage::orderBy('id')->get()->last();
          if($lastAdvantage) {
             $advantage->id = $lastAdvantage->id + 1;
          } else {
             $advantage->id = 1;
          }
          $advantage->pokemon_type_id_owner = $result['pokemon_type_id_owner'];
          $advantage->pokemon_type_id_enemy = $result['pokemon_type_id_enemy'];
          $advantage->factor = $result['factor'];
          $advantage->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($advantage,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $advantage = Advantage::where('id',$result['id'])->update([
             'pokemon_type_id_owner'=>$result['pokemon_type_id_owner'],
             'pokemon_type_id_enemy'=>$result['pokemon_type_id_enemy'],
             'factor'=>$result['factor'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($advantage,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Advantage::destroy($id);
    }

    function backup(Request $data)
    {
       $advantages = Advantage::get();
       $toReturn = [];
       foreach( $advantages as $advantage) {
          $attach = [];
          array_push($toReturn, ["Advantage"=>$advantage, "attach"=>$attach]);
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
         $result = $row['Advantage'];
         $exist = Advantage::where('id',$result['id'])->first();
         if ($exist) {
           Advantage::where('id', $result['id'])->update([
             'pokemon_type_id_owner'=>$result['pokemon_type_id_owner'],
             'pokemon_type_id_enemy'=>$result['pokemon_type_id_enemy'],
             'factor'=>$result['factor'],
           ]);
         } else {
          $advantage = new Advantage();
          $advantage->id = $result['id'];
          $advantage->pokemon_type_id_owner = $result['pokemon_type_id_owner'];
          $advantage->pokemon_type_id_enemy = $result['pokemon_type_id_enemy'];
          $advantage->factor = $result['factor'];
          $advantage->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}