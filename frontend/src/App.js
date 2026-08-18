import { useEffect, useState } from 'react';
import './App.css';
import CartaoMenu from './components/menu/cartaoMenu';
import ConsultarEndereco from './components/consultaEnd/cartaoConsultaCep';
import Noticias from './components/noticias/index';

function App() {
    const [opcao, setOpcao] = useState('');
    const [notificacoes, setNotificacoes] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const consultarNotificacoes = async () => {
        try {
            setCarregando(true);
            const response = await fetch(
                'http://localhost:80/api/cache/noticias'
            );

            if (!response.ok) {
                throw new Error('Erro ao consultar notificações');
            }

            const data = await response.json();

            if (data.noticias && data.noticias.length > 0) {
                setNotificacoes((anteriores) => [
                    ...data.noticias,
                    ...anteriores,
                ]);
            }

        } catch (error) {
            console.error('Erro ao consultar notificações:', error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        consultarNotificacoes();

        const intervalo = setInterval(() => {
            consultarNotificacoes();
        }, 5000);

        const limpar = setTimeout(() => {
            setNotificacoes([]);
        }, 60000);

        return () => {
            clearInterval(intervalo);
            clearTimeout(limpar);
        };
    }, []);

    return (
        <main className="container">
            <section className="cartaoMenu">
                <CartaoMenu
                    opcao={opcao}
                    setOpcao={setOpcao}
                    className="cartaoMenu"
                />
            </section>
                <section className="areaPrincipal">
                    {opcao === 'cep' && (
                        <ConsultarEndereco />
                    )}
                    {opcao === 'noticias' && (
                        <Noticias noticias={notificacoes} />
                    )}
                    <section className="notificacoes">
                    <div className="notificacoesCabecalho">
                        <div>
                            <span className="notificacoesTitulo">
                                Notificações
                            </span>
                            <span className="notificacoesSubtitulo">
                                Atualização automática
                            </span>
                        </div>
                        <span className="status">
                            <span
                                className={`statusPonto ${
                                    carregando ? 'carregando' : ''
                                }`}
                            />
                            Online
                        </span>
                    </div>

                    <div className="notificacoesLista">
                        {notificacoes.length === 0 ? (
                            <div className="notificacaoVazia">
                                <div className="iconeVazio">
                                    🔔
                                </div>
                                <strong>
                                    Nenhuma notificação
                                </strong>
                                <span>
                                    Novas notícias aparecerão aqui automaticamente.
                                </span>
                            </div>
                        ) : (
                            notificacoes.map((noticia, index) => (
                                <article
                                    className="notificacao"
                                    key={`${noticia.id}-${index}`}
                                >
                                    <div className="notificacaoIcone">
                                        🔔
                                    </div>
                                    <div className="notificacaoConteudo">
                                        <div className="notificacaoTopo">
                                            <strong>
                                                {noticia.titulo}
                                            </strong>
                                            <span>
                                                Nova
                                            </span>
                                        </div>
                                        <p>
                                            {noticia.descricao}
                                        </p>
                                        {noticia.created_at && (
                                            <small>
                                                {new Date(
                                                    noticia.created_at
                                                ).toLocaleString('pt-BR')}
                                            </small>
                                        )}
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </section>
            </section>
            
            
            
        </main>
    );
}

export default App;