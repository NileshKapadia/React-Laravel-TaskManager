<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable'
        ]);

        return Project::create($request->all());
    }
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->all());
        return $project;
    }

    public function destroy($id)
    {
        return Project::destroy($id);
    }

    public function show($id)
    {
        try {
            $project = Project::with('tasks')->find($id);
            
            if (!$project) {
                return response()->json([
                    'message' => 'Project not found'
                ], 404);
            }            
            return response()->json($project);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error loading project',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}