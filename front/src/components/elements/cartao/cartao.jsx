function Cartao({ title, paragrafoHeader, children }) {
    return (
        <section className="card">

            <div className="header">
                <h1>{title}</h1>
                {paragrafoHeader && (
                    <p>
                        {paragrafoHeader}
                    </p>
                )}
            </div>

            {children}

        </section>
    );
}

export default Cartao;