import { useState } from 'react';
import axios from 'axios';
import Botao from '../elements/botaoSelecao/botao'
import Cartao from '../elements/cartao/cartao'

function CartaoNoticias({ opcao, setOpcao }) {

    const opcaoNova = () => {
        setOpcao('cep');
    };

    const opcaoNoticias = () => {
        setOpcao('noticias');
    };

    return (
        <Cartao
            title="Noticias"
        >
            <Botao
                selecionado={opcao === 'Nova'}
                id="botaoNova"
                onClick={opcaoNova}
            >
                Nova
            </Botao>

            {/* <Botao
                selecionado={opcao === 'Consultar'}
                id="botaoConsultar"
                onClick={opcaoConsultar}
            >
                Consultar
            </Botao>

            <Botao
                selecionado={opcao === 'Editar'}
                id="botaoEditar"
                onClick={opcaoEditar}
            >
                Editar
            </Botao>

            <Botao
                selecionado={opcao === 'Apagar'}
                id="botaoApagar"
                onClick={opcaoApagar}
            >
                Apagar
            </Botao> */}
        </Cartao>
        
    );
}

export default CartaoNoticias;