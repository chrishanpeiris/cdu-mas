<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use Response;
use Validator;

class ApiRegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'student_id' => 'required|string|max:7',
            'mobile' => 'required|string|max:10',
            'type' => 'required|integer|max:1',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'student_id' => $request->get('student_id'),
            'mobile' => $request->get('mobile'),
            'type' => $request->get('type'),
            'device' => $request->get('device'),
            'password' => bcrypt($request->get('password')),

        ]);
        $user = User::first();
        $token = JWTAuth::fromUser($user);

        return Response::json(compact('token'));
    }
}
