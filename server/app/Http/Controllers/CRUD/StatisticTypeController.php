<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\StatisticType;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StatisticTypeController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(StatisticType::get(),200);
       } else {
          $statistictype = StatisticType::findOrFail($id);
          $attach = [];
          return response()->json(["StatisticType"=>$statistictype, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(StatisticType::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $statistictype = new StatisticType();
          $lastStatisticType = StatisticType::orderBy('id')->get()->last();
          if($lastStatisticType) {
             $statistictype->id = $lastStatisticType->id + 1;
          } else {
             $statistictype->id = 1;
          }
          $statistictype->name = $result['name'];
          $statistictype->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($statistictype,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $statistictype = StatisticType::where('id',$result['id'])->update([
             'name'=>$result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($statistictype,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return StatisticType::destroy($id);
    }

    function backup(Request $data)
    {
       $statistictypes = StatisticType::get();
       $toReturn = [];
       foreach( $statistictypes as $statistictype) {
          $attach = [];
          array_push($toReturn, ["StatisticType"=>$statistictype, "attach"=>$attach]);
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
         $result = $row['StatisticType'];
         $exist = StatisticType::where('id',$result['id'])->first();
         if ($exist) {
           StatisticType::where('id', $result['id'])->update([
             'name'=>$result['name'],
           ]);
         } else {
          $statistictype = new StatisticType();
          $statistictype->id = $result['id'];
          $statistictype->name = $result['name'];
          $statistictype->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}