import { useState } from 'react';
import axios from 'axios';
import './cartaoMenu.css';
import Botao from '../elements/botaoSelecao/botao'
import Cartao from '../elements/cartao/cartao'

function CartaoMenu({ opcao, setOpcao }) {

    const opcaoCep = () => {
        setOpcao('cep');
    };

    const opcaoNoticias = () => {
        setOpcao('noticias');
    };

    return (
        <Cartao
            title="Selecione uma função"
        >
            <Botao
                selecionado={opcao === 'cep'}
                id="botaoCep"
                onClick={opcaoCep}
            >
                Cep
            </Botao>

            <Botao
                selecionado={opcao === 'noticias'}
                id="botaoNoticias"
                onClick={opcaoNoticias}
            >
                Notícias
            </Botao>
        </Cartao>
    );
}

export default CartaoMenu;