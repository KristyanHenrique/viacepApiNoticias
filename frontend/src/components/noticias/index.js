import { useState } from 'react';
import axios from 'axios';
import MenuNoticias from './menu/menu';
import Cartao from '../elements/cartao/cartao';
import CriarNoticia from './criar/criarNoticias';
import TabelaNoticias from './listar/listarNoticias';
import EditarNoticia from './editar/editarNoticia';
import './index.css';

function IndexNoticias() {

    const [opcaoMenuNoticia, setOpcaoMenuNoticia] = useState('');
    const [noticiaEditando, setNoticiaEditando] = useState(null);
    const [atualizarLista, setAtualizarLista] = useState(0);

    const excluirNoticia = async (id) => {
        const confirmou = window.confirm(
            'Tem certeza que deseja excluir esta notícia?'
        );

        if (!confirmou) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:80/api/noticias/${id}`,
                {
                    method: 'DELETE'
                }
            );

            const data = await response.json();

            console.log(response.status);
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao excluir');
            }

            setAtualizarLista(valor => valor + 1);

        } catch (error) {
            console.error('Erro ao excluir notícia:', error);
            alert('Não foi possível excluir a notícia.');
        }
    };

    const editarNoticia = (noticia) => {

        setNoticiaEditando(noticia);
        setOpcaoMenuNoticia('editar');

    };

    const finalizarEdicao = () => {

        setNoticiaEditando(null);

        setAtualizarLista(valor => valor + 1);

        setOpcaoMenuNoticia('listar');

    };

    return (
        <Cartao title="Selecione uma Ação">

            <MenuNoticias
                opcaoMenuNoticia={opcaoMenuNoticia}
                setOpcaoMenuNoticia={setOpcaoMenuNoticia}
                className="menuNoticias"
            />

            {opcaoMenuNoticia === 'criar' && (
                <div className="corpoCartao">

                    <div className="corpoCartao-header">
                        <h2>Crie Uma Notícia</h2>
                    </div>

                    <CriarNoticia />

                </div>
            )}

            {opcaoMenuNoticia === 'listar' && (
                <div className="corpoCartao">

                    <div className="corpoCartao-header">
                        <h2>Lista De Notícias</h2>
                    </div>

                    <TabelaNoticias
                        onEditar={editarNoticia}
                        onExcluir={excluirNoticia}
                        atualizar={atualizarLista}
                    />

                </div>
            )}

            {opcaoMenuNoticia === 'editar' && noticiaEditando && (
                <div className="corpoCartao">

                    <div className="corpoCartao-header">
                        <h2>Editar Notícia</h2>
                    </div>

                    <EditarNoticia
                        noticia={noticiaEditando}
                        onFinalizar={finalizarEdicao}
                    />

                </div>
            )}

        </Cartao>
    );
}

export default IndexNoticias;