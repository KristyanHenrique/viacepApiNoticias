import { useState } from 'react';
import axios from 'axios';
import './editarNoticia.css';

function EditarNoticia({ noticia, onFinalizar }) {

    const [titulo, setTitulo] = useState(noticia.titulo);
    const [descricao, setDescricao] = useState(noticia.descricao);

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    const salvar = async (event) => {

        event.preventDefault();

        setSalvando(true);
        setErro('');

        try {

            await axios.put(
                `http://localhost:80/api/noticias/${noticia.id}`,
                {
                    titulo: titulo,
                    descricao: descricao
                }
            );

            alert('Notícia atualizada com sucesso!');

            onFinalizar();

        } catch (error) {

            console.error('Erro ao editar notícia:', error);

            setErro(
                'Não foi possível atualizar a notícia.'
            );

        } finally {

            setSalvando(false);

        }
    };

    const cancelar = () => {

        onFinalizar();

    };

    return (
        <form
            className="formEditarNoticia"
            onSubmit={salvar}
        >

            <div className="campo">

                <label htmlFor="titulo">
                    Título
                </label>

                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(event) =>
                        setTitulo(event.target.value)
                    }
                    required
                />

            </div>

            <div className="campo">

                <label htmlFor="descricao">
                    Descrição
                </label>

                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(event) =>
                        setDescricao(event.target.value)
                    }
                    required
                />

            </div>

            {erro && (
                <p className="erro">
                    {erro}
                </p>
            )}

            <div className="acoes">

                <button
                    type="button"
                    className="botaoCancelar"
                    onClick={cancelar}
                    disabled={salvando}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="botaoSalvar"
                    disabled={salvando}
                >
                    {salvando
                        ? 'Salvando...'
                        : 'Salvar alterações'
                    }
                </button>

            </div>

        </form>
    );
}

export default EditarNoticia;