import { useEffect, useState } from 'react';
import axios from 'axios';
import './listarNoticias.css';

function TabelaNoticias({ onEditar, onExcluir, atualizar }) {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    const buscarNoticias = async () => {
        try {
            setLoading(true);
            setErro('');

            const response = await axios.get(
                'http://127.0.0.1:80/api/noticias'
            );

            setNoticias(response.data);

        } catch (error) {
            console.error(error);
            setErro('Não foi possível carregar as notícias.');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const buscarNoticias = async () => {

            try {

                setLoading(true);
                setErro('');

                const response = await axios.get(
                    'http://127.0.0.1:80/api/noticias'
                );

                setNoticias(response.data);

            } catch (error) {

                console.error(error);

                setErro(
                    'Não foi possível carregar as notícias.'
                );

            } finally {

                setLoading(false);

            }
        };

        buscarNoticias();

    }, [atualizar]);

    

    if (loading) {
        return (
            <p>Carregando notícias...</p>
        );
    }

    if (erro) {
        return (
            <p>{erro}</p>
        );
    }

    if (noticias.length === 0) {
        return (
            <p>Nenhuma notícia cadastrada.</p>
        );
    }

    return (
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
                {noticias.map((noticia) => (
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
                                onClick={() => excluirNoticia(noticia.id)}
                            >
                                Excluir
                            </button>
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    );
}

export default TabelaNoticias;