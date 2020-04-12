<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'Web Wervice Realizado con LSCodeGenerator';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);


   //LSPokeCalc

   //CRUD ProfilePicture
   $router->post('/profilepicture', ['uses' => 'ProfilePictureController@post']);
   $router->get('/profilepicture', ['uses' => 'ProfilePictureController@get']);
   $router->get('/profilepicture/paginate', ['uses' => 'ProfilePictureController@paginate']);
   $router->put('/profilepicture', ['uses' => 'ProfilePictureController@put']);
   $router->delete('/profilepicture', ['uses' => 'ProfilePictureController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);

   //CRUD Pokemon
   $router->post('/pokemon', ['uses' => 'PokemonController@post']);
   $router->get('/pokemon', ['uses' => 'PokemonController@get']);
   $router->get('/pokemon/paginate', ['uses' => 'PokemonController@paginate']);
   $router->get('/pokemon/backup', ['uses' => 'PokemonController@backup']);
   $router->put('/pokemon', ['uses' => 'PokemonController@put']);
   $router->delete('/pokemon', ['uses' => 'PokemonController@delete']);
   $router->post('/pokemon/masive_load', ['uses' => 'PokemonController@masiveLoad']);

   //CRUD Statistic
   $router->post('/statistic', ['uses' => 'StatisticController@post']);
   $router->get('/statistic', ['uses' => 'StatisticController@get']);
   $router->get('/statistic/paginate', ['uses' => 'StatisticController@paginate']);
   $router->get('/statistic/backup', ['uses' => 'StatisticController@backup']);
   $router->put('/statistic', ['uses' => 'StatisticController@put']);
   $router->delete('/statistic', ['uses' => 'StatisticController@delete']);
   $router->post('/statistic/masive_load', ['uses' => 'StatisticController@masiveLoad']);

   //CRUD StatisticType
   $router->post('/statistictype', ['uses' => 'StatisticTypeController@post']);
   $router->get('/statistictype', ['uses' => 'StatisticTypeController@get']);
   $router->get('/statistictype/paginate', ['uses' => 'StatisticTypeController@paginate']);
   $router->get('/statistictype/backup', ['uses' => 'StatisticTypeController@backup']);
   $router->put('/statistictype', ['uses' => 'StatisticTypeController@put']);
   $router->delete('/statistictype', ['uses' => 'StatisticTypeController@delete']);
   $router->post('/statistictype/masive_load', ['uses' => 'StatisticTypeController@masiveLoad']);

   //CRUD PokemonType
   $router->post('/pokemontype', ['uses' => 'PokemonTypeController@post']);
   $router->get('/pokemontype', ['uses' => 'PokemonTypeController@get']);
   $router->get('/pokemontype/paginate', ['uses' => 'PokemonTypeController@paginate']);
   $router->get('/pokemontype/backup', ['uses' => 'PokemonTypeController@backup']);
   $router->put('/pokemontype', ['uses' => 'PokemonTypeController@put']);
   $router->delete('/pokemontype', ['uses' => 'PokemonTypeController@delete']);
   $router->post('/pokemontype/masive_load', ['uses' => 'PokemonTypeController@masiveLoad']);

   //CRUD Ability
   $router->post('/ability', ['uses' => 'AbilityController@post']);
   $router->get('/ability', ['uses' => 'AbilityController@get']);
   $router->get('/ability/paginate', ['uses' => 'AbilityController@paginate']);
   $router->get('/ability/backup', ['uses' => 'AbilityController@backup']);
   $router->put('/ability', ['uses' => 'AbilityController@put']);
   $router->delete('/ability', ['uses' => 'AbilityController@delete']);
   $router->post('/ability/masive_load', ['uses' => 'AbilityController@masiveLoad']);

   //CRUD Movement
   $router->post('/movement', ['uses' => 'MovementController@post']);
   $router->get('/movement', ['uses' => 'MovementController@get']);
   $router->get('/movement/paginate', ['uses' => 'MovementController@paginate']);
   $router->get('/movement/backup', ['uses' => 'MovementController@backup']);
   $router->put('/movement', ['uses' => 'MovementController@put']);
   $router->delete('/movement', ['uses' => 'MovementController@delete']);
   $router->post('/movement/masive_load', ['uses' => 'MovementController@masiveLoad']);

   //CRUD Nature
   $router->post('/nature', ['uses' => 'NatureController@post']);
   $router->get('/nature', ['uses' => 'NatureController@get']);
   $router->get('/nature/paginate', ['uses' => 'NatureController@paginate']);
   $router->get('/nature/backup', ['uses' => 'NatureController@backup']);
   $router->put('/nature', ['uses' => 'NatureController@put']);
   $router->delete('/nature', ['uses' => 'NatureController@delete']);
   $router->post('/nature/masive_load', ['uses' => 'NatureController@masiveLoad']);

   //CRUD Advantage
   $router->post('/advantage', ['uses' => 'AdvantageController@post']);
   $router->get('/advantage', ['uses' => 'AdvantageController@get']);
   $router->get('/advantage/paginate', ['uses' => 'AdvantageController@paginate']);
   $router->get('/advantage/backup', ['uses' => 'AdvantageController@backup']);
   $router->put('/advantage', ['uses' => 'AdvantageController@put']);
   $router->delete('/advantage', ['uses' => 'AdvantageController@delete']);
   $router->post('/advantage/masive_load', ['uses' => 'AdvantageController@masiveLoad']);
});
