import { useEffect, useState } from 'react';
import axios from 'axios';
import './listarNoticias.css';

function TabelaNoticias({ onEditar, onExcluir, atualizar }) {

    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);

    const [total, setTotal] = useState(0);
    const [ultimaPagina, setUltimaPagina] = useState(1);

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroDescricao, setFiltroDescricao] = useState('');

    const buscarNoticias = async (
        paginaBusca = pagina,
        tituloBusca = titulo,
        descricaoBusca = descricao
    ) => {
        try {
            setLoading(true);
            setErro('');

            const response = await axios.get(
                'http://127.0.0.1:80/api/noticias',
                {
                    params: {
                        page: paginaBusca,
                        limit: porPagina,
                        titulo: tituloBusca,
                        descricao: descricaoBusca
                    }
                }
            );

            console.log('REQUISIÇÃO:', response.config.url);
            console.log('PARÂMETROS:', response.config.params);
            console.log('RESPOSTA:', response.data);

            setNoticias(
                Array.isArray(response.data.data)
                    ? response.data.data
                    : []
            );

            setTotal(response.data.total || 0);
            setUltimaPagina(response.data.last_page || 1);

        } catch (error) {
            console.error('ERRO:', error);

            setErro('Não foi possível carregar as notícias.');
            setNoticias([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarNoticias();
    }, [pagina, porPagina, atualizar]);

    const aplicarFiltros = () => {
        setPagina(1);

        buscarNoticias(
            1,
            titulo,
            descricao
        );
    };

    const limparFiltros = () => {
        setTitulo('');
        setDescricao('');
        setPagina(1);

        buscarNoticias(1, '', '');
    };


    const paginaAnterior = () => {

        if (pagina > 1) {

            setPagina(pagina - 1);

        }

    };


    const proximaPagina = () => {

        if (pagina < ultimaPagina) {

            setPagina(pagina + 1);

        }

    };


    if (loading) {

        return (
            <p>
                Carregando notícias...
            </p>
        );

    }


    if (erro) {

        return (
            <p>
                {erro}
            </p>
        );

    }


    return (
        <div>

            {/* FILTROS */}

            <div className="filtrosNoticias">

                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={titulo}
                    onChange={(e) =>
                        setTitulo(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Filtrar por descrição"
                    value={descricao}
                    onChange={(e) =>
                        setDescricao(e.target.value)
                    }
                />

                <button
                    type="button"
                    onClick={aplicarFiltros}
                >
                    Filtrar
                </button>

                <button
                    type="button"
                    onClick={limparFiltros}
                >
                    Limpar
                </button>

            </div>


            {/* TABELA */}

            {noticias.length === 0 ? (

                <p>
                    Nenhuma notícia encontrada.
                </p>

            ) : (

                <table className="tabelaNoticias">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Editar</th>
                            <th>Excluir</th>

                        </tr>

                    </thead>

                    <tbody>

                        {Array.isArray(noticias) && noticias.map((noticia) => (
                                <tr key={noticia.id}>

                                <td>
                                    {noticia.id}
                                </td>

                                <td>
                                    {noticia.titulo}
                                </td>

                                <td>
                                    {noticia.descricao}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        className="botaoEditar"
                                        onClick={() => onEditar(noticia)}
                                    >
                                        Editar
                                    </button>
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        className="botaoExcluir"
                                        onClick={() => onExcluir(noticia.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            )}


            {/* PAGINAÇÃO */}

            <div className="paginacaoNoticias">

                <button
                    type="button"
                    onClick={paginaAnterior}
                    disabled={pagina === 1}
                >
                    Anterior
                </button>

                <span>
                    Página {pagina} de {ultimaPagina}
                </span>

                <button
                    type="button"
                    onClick={proximaPagina}
                    disabled={pagina === ultimaPagina}
                >
                    Próxima
                </button>

            </div>


            {/* TOTAL */}

            <div className="infoPaginacao">

                Total de notícias: {total}

            </div>


            {/* QUANTIDADE */}

            <div className="quantidadePagina">

                <label>
                    Notícias por página:
                </label>

                <select
                    value={porPagina}
                    onChange={(e) => {

                        setPorPagina(
                            Number(e.target.value)
                        );

                        setPagina(1);

                    }}
                >

                    <option value={5}>
                        5
                    </option>

                    <option value={10}>
                        10
                    </option>

                    <option value={20}>
                        20
                    </option>

                    <option value={50}>
                        50
                    </option>

                </select>

            </div>

        </div>
    );
}

export default TabelaNoticias;