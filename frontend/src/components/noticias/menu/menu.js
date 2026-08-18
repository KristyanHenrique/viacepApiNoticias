import { useState } from 'react';
import axios from 'axios';
import './cartaoMenu.css';
import Botao from '../../elements/botaoSelecao/botao'


function MenuNoticias({ opcaoMenuNoticia, setOpcaoMenuNoticia }) {

    const opcaoCriar = () => {
        setOpcaoMenuNoticia('criar');
    };

    const opcaoListar = () => {
        setOpcaoMenuNoticia('listar');
    };

    return (
        <div>
            <Botao
                selecionado={opcaoMenuNoticia === 'listar'}
                id="botaoListar"
                onClick={opcaoListar}
            >
                Listar
            </Botao>

            <Botao
                selecionado={opcaoMenuNoticia === 'criar'}
                id="botaoCriar"
                onClick={opcaoCriar}
            >
                Criar
            </Botao>
        </div>
    );
}

export default MenuNoticias;