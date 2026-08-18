import './botao.css'

function Botao({ selecionado, onClick, children, id }) {
    return (
        <button
            className={selecionado ? 'button selecionado' : 'button'}
            id={id}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Botao;