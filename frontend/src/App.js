import { useState } from 'react';
import './App.css';
import CartaoMenu from './components/menu/cartaoMenu';
import ConsultarEndereco from './components/consultaEnd/cartaoConsultaCep';
import Noticias from './components/noticias/index';

function App() {
    const [opcao, setOpcao] = useState('');

    return (
        <main className="container">

            <section className='cartaoMenu'>
                <CartaoMenu
                    opcao={opcao}
                    setOpcao={setOpcao}
                    className="cartaoMenu"
                />
            </section>
            
            {opcao === 'cep' && (
                <ConsultarEndereco />
            )}

            {opcao === 'noticias' && (
                <Noticias />
            )}

        </main>
    );
}

export default App;