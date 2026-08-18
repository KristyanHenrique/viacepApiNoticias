<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Illuminate\Http\Request;

class NoticiaController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);

        $noticias = Noticia::query()
            ->when($request->filled('titulo'), function ($query) use ($request) {
                $query->where('titulo', 'like', '%' . $request->titulo . '%');
            })
            ->when($request->filled('descricao'), function ($query) use ($request) {
                $query->where('descricao', 'like', '%' . $request->descricao . '%');
            })
            ->orderByDesc('id')
            ->paginate($limit);

        return response()->json($noticias);
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
        ]);

        $noticia = Noticia::create($dados);

        return response()->json(
            $noticia,
            201
        );
    }

    public function show(Noticia $noticia)
    {
        return response()->json(
            $noticia
        );
    }

    public function update(Request $request, Noticia $noticia)
    {
        $dados = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
        ]);

        $noticia->update($dados);

        return response()->json(
            $noticia
        );
    }

    public function destroy(Noticia $noticia)
    {
        $noticia->delete();

        return response()->json([
            'message' => 'Notícia removida com sucesso.'
        ]);
    }
}