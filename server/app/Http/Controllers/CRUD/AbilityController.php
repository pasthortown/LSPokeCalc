<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Ability;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AbilityController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Ability::get(),200);
       } else {
          $ability = Ability::findOrFail($id);
          $attach = [];
          return response()->json(["Ability"=>$ability, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Ability::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $ability = new Ability();
          $lastAbility = Ability::orderBy('id')->get()->last();
          if($lastAbility) {
             $ability->id = $lastAbility->id + 1;
          } else {
             $ability->id = 1;
          }
          $ability->name = $result['name'];
          $ability->description = $result['description'];
          $ability->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($ability,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $ability = Ability::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'description'=>$result['description'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($ability,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Ability::destroy($id);
    }

    function backup(Request $data)
    {
       $abilities = Ability::get();
       $toReturn = [];
       foreach( $abilities as $ability) {
          $attach = [];
          array_push($toReturn, ["Ability"=>$ability, "attach"=>$attach]);
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
         $result = $row['Ability'];
         $exist = Ability::where('id',$result['id'])->first();
         if ($exist) {
           Ability::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'description'=>$result['description'],
           ]);
         } else {
          $ability = new Ability();
          $ability->id = $result['id'];
          $ability->name = $result['name'];
          $ability->description = $result['description'];
          $ability->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}