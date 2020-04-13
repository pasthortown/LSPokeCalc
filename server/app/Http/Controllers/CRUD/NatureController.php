<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Nature;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NatureController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Nature::get(),200);
       } else {
          $nature = Nature::findOrFail($id);
          $attach = [];
          return response()->json(["Nature"=>$nature, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       try{
         return response()->json(Nature::paginate($size),200);
       } catch (Exception $e) {
         return response()->json(['data'=>[]],200);
       }
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $nature = new Nature();
          $lastNature = Nature::orderBy('id')->get()->last();
          if($lastNature) {
             $nature->id = $lastNature->id + 1;
          } else {
             $nature->id = 1;
          }
          $nature->name = $result['name'];
          $nature->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($nature,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $nature = Nature::where('id',$result['id'])->update([
             'name'=>$result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($nature,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Nature::destroy($id);
    }

    function backup(Request $data)
    {
       $natures = Nature::get();
       $toReturn = [];
       foreach( $natures as $nature) {
          $attach = [];
          array_push($toReturn, ["Nature"=>$nature, "attach"=>$attach]);
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
         $result = $row['Nature'];
         $exist = Nature::where('id',$result['id'])->first();
         if ($exist) {
           Nature::where('id', $result['id'])->update([
             'name'=>$result['name'],
           ]);
         } else {
          $nature = new Nature();
          $nature->id = $result['id'];
          $nature->name = $result['name'];
          $nature->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
