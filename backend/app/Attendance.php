<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable=['unit_id','student_id','week_number','attendance'];
}
