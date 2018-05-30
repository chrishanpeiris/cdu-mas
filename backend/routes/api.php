<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::get('mark/check', 'AttendanceController@checkWeek');
Route::post('mark/attendance','AttendanceController@storeStudent');
Route::post('mark/present','AttendanceController@updateStudent');
Route::get('mark/getpresent','AttendanceController@getAttendanceMark');
Route::get('mark/allstudents','AttendanceController@getAllStudentCount');

Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});


//Route::get('unit/{id}','UnitController@getLectureUnits');
Route::resource('unit', 'UnitController');
Route::resource('mark', 'AttendanceController');
Route::post('register', 'ApiRegisterController@register');



// Auth::routes();
