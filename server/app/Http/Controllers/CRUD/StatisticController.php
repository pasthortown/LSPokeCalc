<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Statistic;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StatisticController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Statistic::get(),200);
       } else {
          $statistic = Statistic::findOrFail($id);
          $attach = [];
          return response()->json(["Statistic"=>$statistic, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       try{
         return response()->json(Statistic::paginate($size),200);
       } catch (Exception $e) {
         return response()->json(['data'=>[]],200);
       }
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $statistic = new Statistic();
          $lastStatistic = Statistic::orderBy('id')->get()->last();
          if($lastStatistic) {
             $statistic->id = $lastStatistic->id + 1;
          } else {
             $statistic->id = 1;
          }
          $statistic->hp = $result['hp'];
          $statistic->attack = $result['attack'];
          $statistic->defense = $result['defense'];
          $statistic->special_attack = $result['special_attack'];
          $statistic->special_defense = $result['special_defense'];
          $statistic->speed = $result['speed'];
          $statistic->statistic_type_id = $result['statistic_type_id'];
          $statistic->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($statistic,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $statistic = Statistic::where('id',$result['id'])->update([
             'hp'=>$result['hp'],
             'attack'=>$result['attack'],
             'defense'=>$result['defense'],
             'special_attack'=>$result['special_attack'],
             'special_defense'=>$result['special_defense'],
             'speed'=>$result['speed'],
             'statistic_type_id'=>$result['statistic_type_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($statistic,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Statistic::destroy($id);
    }

    function backup(Request $data)
    {
       $statistics = Statistic::get();
       $toReturn = [];
       foreach( $statistics as $statistic) {
          $attach = [];
          array_push($toReturn, ["Statistic"=>$statistic, "attach"=>$attach]);
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
         $result = $row['Statistic'];
         $exist = Statistic::where('id',$result['id'])->first();
         if ($exist) {
           Statistic::where('id', $result['id'])->update([
             'hp'=>$result['hp'],
             'attack'=>$result['attack'],
             'defense'=>$result['defense'],
             'special_attack'=>$result['special_attack'],
             'special_defense'=>$result['special_defense'],
             'speed'=>$result['speed'],
             'statistic_type_id'=>$result['statistic_type_id'],
           ]);
         } else {
          $statistic = new Statistic();
          $statistic->id = $result['id'];
          $statistic->hp = $result['hp'];
          $statistic->attack = $result['attack'];
          $statistic->defense = $result['defense'];
          $statistic->special_attack = $result['special_attack'];
          $statistic->special_defense = $result['special_defense'];
          $statistic->speed = $result['speed'];
          $statistic->statistic_type_id = $result['statistic_type_id'];
          $statistic->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}
