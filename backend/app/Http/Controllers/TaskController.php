<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index($projectId)
    {
        return Task::where('project_id', $projectId)->get();
    }

    public function store(Request $request, $projectId)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'completed' => 'boolean'
        ]);

        $taskData = array_merge($request->all(), ['project_id' => $projectId]);
        return Task::create($taskData);
    }

    public function show($projectId, $id)
    {
        return Task::where('project_id', $projectId)->findOrFail($id);
    }

    public function update(Request $request, $projectId, $id)
    {
        try {
            $task = Task::where('project_id', $projectId)->findOrFail($id);
            
            $request->validate([
                'title' => 'sometimes|required',
                'description' => 'nullable',
                'completed' => 'sometimes|boolean'
            ]);

            $task->update($request->all());
            
            return response()->json($task);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($projectId, $id)
    {
        try {
            $task = Task::where('project_id', $projectId)->findOrFail($id);
            $task->delete();
            
            return response()->json([
                'message' => 'Task deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}