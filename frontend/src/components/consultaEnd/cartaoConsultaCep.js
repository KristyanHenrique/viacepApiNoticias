import { useState } from 'react';
import axios from 'axios';
import './cartaoConsultaCep.css';
import Cartao from '../elements/cartao/cartao'

function FormConsultaEnd() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const formatarCep = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);

    if (numeros.length > 5) {
      return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
    }

    return numeros;
  };

  const buscarCep = async (event) => {
    event.preventDefault();

    const cepLimpo = cep.replace(/\D/g, '');

    setErro('');
    setEndereco(null);

    if (cepLimpo.length !== 8) {
      setErro('Digite um CEP válido com 8 números.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      if (response.data.erro) {
        setErro('CEP não encontrado.');
        return;
      }

      setEndereco(response.data);
    } catch (error) {
      console.error(error);
      setErro(
        'Não foi possível consultar o CEP. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Cartao
      title="Consultar endereço"
      paragrafoHeader="Digite um CEP para consultar o endereço."
    >
      

        <form onSubmit={buscarCep}>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>

            <div className="input-button">
              <input
                id="cep"
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(event) =>
                  setCep(formatarCep(event.target.value))
                }
                disabled={loading}
                maxLength={9}
                autoComplete="postal-code"
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Consultando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Consultando endereço...</span>
          </div>
        )}

        {erro && !loading && (
          <div className="error" role="alert">
            <strong>Não foi possível consultar.</strong>
            <span>{erro}</span>
          </div>
        )}

        {endereco && !loading && (
          <div className="result">
            <div className="result-header">
              <h2>Endereço encontrado</h2>
              <span className="cep-badge">
                {endereco.cep}
              </span>
            </div>

            <div className="address-grid">
              <div className="field">
                <span>Logradouro</span>
                <strong>
                  {endereco.logradouro || 'Não informado'}
                </strong>
              </div>

              <div className="field">
                <span>Bairro</span>
                <strong>
                  {endereco.bairro || 'Não informado'}
                </strong>
              </div>

              <div className="field">
                <span>Cidade</span>
                <strong>
                  {endereco.localidade || 'Não informado'}
                </strong>
              </div>

              <div className="field">
                <span>Estado</span>
                <strong>
                  {endereco.uf || 'Não informado'}
                </strong>
              </div>

              <div className="field">
                <span>Complemento</span>
                <strong>
                  {endereco.complemento || 'Não informado'}
                </strong>
              </div>

              <div className="field">
                <span>IBGE</span>
                <strong>
                  {endereco.ibge || 'Não informado'}
                </strong>
              </div>
            </div>
          </div>
        )}
      </Cartao>
  );
}

export default FormConsultaEnd;