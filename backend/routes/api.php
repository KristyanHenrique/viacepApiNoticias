<?php

use App\Http\Controllers\NoticiaController;
use Illuminate\Support\Facades\Route;

Route::apiResource('noticias', NoticiaController::class);