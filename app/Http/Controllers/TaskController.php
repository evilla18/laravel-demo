<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = auth('api')->user()->tasks()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Lista de tareas',
            'data' => $tasks,
        ]);
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = auth('api')->user()->tasks()->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Tarea creada exitosamente',
            'data' => $task,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $task = auth('api')->user()->tasks()->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Detalle de tarea',
            'data' => $task,
        ]);
    }

    public function update(TaskRequest $request, int $id): JsonResponse
    {
        $task = auth('api')->user()->tasks()->findOrFail($id);
        $task->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Tarea actualizada exitosamente',
            'data' => $task,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $task = auth('api')->user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Tarea eliminada exitosamente',
            'data' => null,
        ]);
    }
}
