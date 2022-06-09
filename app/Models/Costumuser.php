<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Costumuser extends Model
{
    use HasFactory;
    protected $table = 'costumuser';
    protected $fillable = [
        'email',
        'password',
    ];
    public function getImg()
    {
        return $this->hasMany('App\Models\Img', 'user_id');
    }
    public function getAddress()
    {
        return $this->hasMany('App\Models\Address', 'user_id');
    }
}
