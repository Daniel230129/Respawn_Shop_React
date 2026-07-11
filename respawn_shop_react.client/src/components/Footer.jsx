import { Link } from 'react-router-dom';

const footerStyles = `
.footer {
    background: #060612;
    border-top: 1px solid transparent;
    border-image: linear-gradient(90deg, #00D4FF, #7B2FBE) 1;
    padding: 3rem 2rem 1.5rem;
    margin-top: auto;
}

.footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding-bottom: 2rem;
    border-bottom: 1px solid #1e1e3f;
    margin-bottom: 1.5rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 1.2rem;
    color: #FFFFFF;
    text-decoration: none;
    text-shadow: 0 0 12px rgba(0, 212, 255, 0.6);
    letter-spacing: 1px;
}

.footer-logo-icon {
    color: #00D4FF;
    font-size: 1.5rem;
    filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.7));
}

.footer-logo-sub {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    color: #A0ADB8;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: none;
    margin-top: 4px;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-links h4 {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    color: #00D4FF;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.footer-links a {
    color: #A0ADB8;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: #00D4FF;
}

.footer-socials {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
}

.footer-socials h4 {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    color: #00D4FF;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.footer-social-icons {
    display: flex;
    gap: 12px;
}

.footer-social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #1e1e3f;
    color: #A0ADB8;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    background: #111128;
}

.footer-social-icon:hover {
    background: #00D4FF;
    border-color: #00D4FF;
    color: #060612;
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    transform: translateY(-3px);
}

.footer-copy {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
    color: #3a3a5e;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
}

@media (max-width: 768px) {
    .footer-inner {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .footer-socials { align-items: center; }
}
`;

function Footer() {
    return (
        <>
            <style>{footerStyles}</style>
            <footer className="footer">
                <div className="footer-inner">
                    {/* LOGO */}
                    <div>
                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-icon">🎮</span>
                            <div>
                                Respawn Shop
                                <span className="footer-logo-sub">Gaming Store</span>
                            </div>
                        </Link>
                    </div>

                    {/* LINKS CATEGORÍAS */}
                    <nav className="footer-links">
                        <h4>Categorías</h4>
                        <Link to="/catalogo">Videojuegos</Link>
                        <Link to="/catalogo">Consolas</Link>
                        <Link to="/catalogo">Controles</Link>
                        <Link to="/catalogo">Funko Pops</Link>
                        <Link to="/catalogo">Accesorios</Link>
                    </nav>

                    {/* LINKS TIENDA */}
                    <nav className="footer-links">
                        <h4>Tienda</h4>
                        <Link to="/">Inicio</Link>
                        <Link to="/catalogo">Catálogo</Link>
                        <Link to="/carrito">Carrito</Link>
                    </nav>

                    {/* REDES SOCIALES */}
                    <div className="footer-socials">
                        <h4>Síguenos</h4>
                        <div className="footer-social-icons">
                            <a href="#" className="footer-social-icon" aria-label="Instagram">📸</a>
                            <a href="#" className="footer-social-icon" aria-label="Twitter/X">🐦</a>
                            <a href="#" className="footer-social-icon" aria-label="Discord">💬</a>
                            <a href="#" className="footer-social-icon" aria-label="YouTube">📺</a>
                        </div>
                    </div>
                </div>

                <p className="footer-copy">
                    © 2026 Respawn Shop — Proyecto Universitario React &amp; .NET Core. Todos los derechos reservados.
                </p>
            </footer>
        </>
    );
}

export default Footer;