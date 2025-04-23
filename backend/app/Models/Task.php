<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'completed', 'project_id'];

    // Add this relationship
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}