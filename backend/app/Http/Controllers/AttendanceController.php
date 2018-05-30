<?php

namespace App\Http\Controllers;

use App\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $unit_id = $request->input("id");
        $students = DB::table('student_units')->where('unit_id', '=', $unit_id)->get();
        return response()->json($students);

    }

    public function checkWeek(Request $request)
    {
        $unit_id = $request->input('id');
        $week = $request->input('week');
        $result = DB::table('attendances')->where([
            ['unit_id', '=', $unit_id],
            ['week_number', '=', $week],
        ])->exists();
        $result=false;

        return response()->json($result);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attendance = new Attendance();

        $attendance->unit_id = $request->get('unit_id');
        $attendance->student_id = $request->get('student_id');
        $attendance->week_number = $request->get('week_number');
        $attendance->attendance = $request->get('attendance');

        $result = $attendance->save();

        return response()->json($result);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attendance $attendance)
    {
        $attendance = Attendance::find($request->get('student_id'));
        $attendance->attendance = $request->get('attendance');
        $result = $attendance->save();

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    public function updateStudent(Request $request, Attendance $attendance)
    {
        $result = Attendance::where('student_id', $request->get('student_id'))
            ->where('unit_id', $request->get('unit_id'))
            ->where('week_number', $request->get('week_number'))
            ->update(['attendance' => $request->get('attendance')]);
//        $attendance->attendance = $request->get('attendance');
//        $result = $attendance->save();

        return response()->json($result);
    }

    public function storeStudent(Request $request)
    {
        $attendance = new Attendance();

        $attendance->unit_id = $request->get('unit_id');
        $attendance->student_id = $request->get('student_id');
        $attendance->week_number = $request->get('week_number');
        $attendance->attendance = $request->get('attendance');

        $result = $attendance->save();

        return response()->json($result);

    }

    public function getAttendanceMark(Request $request){

        $unit_id=$request->get("unit_id");
        $week=$request->get("week");

        $result = Attendance::where([
            ['unit_id', '=', $unit_id],
            ['week_number', '=', $week],
            ["attendance","=",1],
        ])->count();

        return response()->json($result);


    }
    public function getAllStudentCount(Request $request){
        $unit_id=$request->get("unit_id");
        $week=$request->get("week");

        $result = Attendance::where([
            ['unit_id', '=', $unit_id],
            ['week_number', '=', $week],
        ])->count();

        return response()->json($result);

    }
}
