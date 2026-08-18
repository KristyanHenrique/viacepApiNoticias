import { useState } from 'react';
import axios from 'axios';
import Botao from '../../elements/botaoSelecao/botao'
import Cartao from '../../elements/cartao/cartao'
import './criarNoticias.css'

function CriarNoticia({ opcao, setOpcao }) {

   const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const salvarNoticia = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErro('');
        setSucesso('');

        try {
            await axios.post('http://127.0.0.1:80/api/noticias', {
                titulo: titulo,
                descricao: descricao
            });

            setTitulo('');
            setDescricao('');
            setSucesso('Notícia criada com sucesso!');
        } catch (error) {
            console.error(error);
            setErro('Não foi possível criar a notícia.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <form onSubmit={salvarNoticia}>

                <div className="form-group">
                    <label htmlFor="titulo">
                        Título
                    </label>

                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(event) => setTitulo(event.target.value)}
                        placeholder="Digite o título da notícia"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">
                        Descrição
                    </label>

                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(event) => setDescricao(event.target.value)}
                        placeholder="Digite a descrição da notícia"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="button"
                    disabled={loading}
                >
                    {loading ? 'Salvando...' : 'Salvar notícia'}
                </button>

            </form>

            {erro && (
                <div className="error">
                    {erro}
                </div>
            )}

            {sucesso && (
                <div className="success">
                    {sucesso}
                </div>
            )}
        </section>
    );
}

export default CriarNoticia;