<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Movement;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MovementController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Movement::get(),200);
       } else {
          $movement = Movement::findOrFail($id);
          $attach = [];
          return response()->json(["Movement"=>$movement, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       try{
         return response()->json(Movement::paginate($size),200);
       } catch (Exception $e) {
         return response()->json(['data'=>[]],200);
       }
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $movement = new Movement();
          $lastMovement = Movement::orderBy('id')->get()->last();
          if($lastMovement) {
             $movement->id = $lastMovement->id + 1;
          } else {
             $movement->id = 1;
          }
          $movement->name = $result['name'];
          $movement->effect = $result['effect'];
          $movement->power = $result['power'];
          $movement->accurancy = $result['accurancy'];
          $movement->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($movement,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $movement = Movement::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'effect'=>$result['effect'],
             'power'=>$result['power'],
             'accurancy'=>$result['accurancy'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($movement,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Movement::destroy($id);
    }

    function backup(Request $data)
    {
       $movements = Movement::get();
       $toReturn = [];
       foreach( $movements as $movement) {
          $attach = [];
          array_push($toReturn, ["Movement"=>$movement, "attach"=>$attach]);
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
         $result = $row['Movement'];
         $exist = Movement::where('id',$result['id'])->first();
         if ($exist) {
           Movement::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'effect'=>$result['effect'],
             'power'=>$result['power'],
             'accurancy'=>$result['accurancy'],
           ]);
         } else {
          $movement = new Movement();
          $movement->id = $result['id'];
          $movement->name = $result['name'];
          $movement->effect = $result['effect'];
          $movement->power = $result['power'];
          $movement->accurancy = $result['accurancy'];
          $movement->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
