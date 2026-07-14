import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const navbarStyles = `
.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(6, 6, 18, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(90deg, #00D4FF, #7B2FBE) 1;
    padding: 0 2rem;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 20px rgba(0, 212, 255, 0.1);
}

.navbar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 1.3rem;
    color: #FFFFFF;
    letter-spacing: 1px;
    transition: all 0.3s ease;
}

.navbar-logo:hover {
    text-shadow: 0 0 15px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.4);
}

.navbar-logo-icon {
    color: #00D4FF;
    font-size: 1.6rem;
    filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.7));
}

.navbar-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
}

.navbar-nav a {
    color: #A0ADB8;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
}

.navbar-nav a::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00D4FF, #7B2FBE);
    border-radius: 2px;
    transition: width 0.3s ease;
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.7);
}

.navbar-nav a:hover {
    color: #00D4FF;
}

.navbar-nav a:hover::after {
    width: 70%;
}

.navbar-nav a.active {
    color: #00D4FF;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.navbar-nav a.active::after {
    width: 70%;
}

.navbar-nav a.admin-link {
    color: #FFD700;
    text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
}
.navbar-nav a.admin-link::after {
    background: linear-gradient(90deg, #FFD700, #FF8C00);
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.7);
}
.navbar-nav a.admin-link:hover {
    color: #FFF;
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}
.navbar-nav a.admin-link.active {
    color: #FFF;
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}

.navbar-auth-section {
    display: flex;
    align-items: center;
    gap: 15px;
}

.navbar-greeting {
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
}

.navbar-greeting span {
    color: #00D4FF;
    font-weight: 700;
}

.navbar-btn-outline {
    background: transparent;
    color: #00D4FF;
    border: 1px solid #00D4FF;
    padding: 8px 16px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
}

.navbar-btn-outline:hover {
    background: rgba(0, 212, 255, 0.1);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
}

.navbar-btn-logout {
    color: #FF006E;
    border-color: #FF006E;
}

.navbar-btn-logout:hover {
    background: rgba(255, 0, 110, 0.1);
    box-shadow: 0 0 10px rgba(255, 0, 110, 0.4);
    color: #FFFFFF;
}

.navbar-cart-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.25);
}

.navbar-cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.45);
}

.navbar-cart-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #FF006E;
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 900;
    border: 2px solid #060612;
    animation: pulse-neon 1s ease-in-out infinite;
}

.navbar-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 6px;
    background: none;
    border: none;
}

.navbar-hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #A0ADB8;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.navbar-hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
    background: #00D4FF;
}
.navbar-hamburger.open span:nth-child(2) {
    opacity: 0;
}
.navbar-hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
    background: #00D4FF;
}

.navbar-mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(6, 6, 18, 0.97);
    backdrop-filter: blur(20px);
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-bottom: 1px solid #1e1e3f;
    z-index: 999;
    transform: translateY(-120%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
}

.navbar-mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
}

.navbar-mobile-menu a {
    color: #A0ADB8;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 12px 0;
    border-bottom: 1px solid #1e1e3f;
    transition: color 0.3s;
}

.navbar-mobile-menu a:hover, .navbar-mobile-menu a.active {
    color: #00D4FF;
}

@media (max-width: 768px) {
    .navbar-hamburger { display: flex; }
    .navbar-nav { display: none; }
    .navbar-auth-section { display: none; }
    .navbar-logo { font-size: 1.1rem; }
}
`;

function Header() {
    const { carrito, vaciarCarrito } = useContext(CartContext);
    const { usuario, logout } = useContext(AuthContext);

    const isAdmin = localStorage.getItem('rol') === 'Administrador';

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const cerrarSesionCompleta = () => {
        vaciarCarrito();
        logout();
        localStorage.removeItem('rol');
    };

    const isActive = (path) =>
        path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path);

    return (
        <>
            <style>{navbarStyles}</style>
            <header className="navbar">
                <Link to="/" className="navbar-logo">
                    <span className="navbar-logo-icon">🎮</span>
                    Respawn Shop
                </Link>

                <nav>
                    <ul className="navbar-nav">
                        <li><Link to="/" className={isActive('/') ? 'active' : ''}>Inicio</Link></li>
                        <li><Link to="/catalogo" className={isActive('/catalogo') ? 'active' : ''}>Catálogo</Link></li>

                        {usuario && !isAdmin && (
                            <li><Link to="/mis-pedidos" className={isActive('/mis-pedidos') ? 'active' : ''}>📦 Mis Pedidos</Link></li>
                        )}

                        {isAdmin && (
                            <li>
                                <Link to="/admin" className={`admin-link ${isActive('/admin') ? 'active' : ''}`}>
                                    Panel Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="navbar-auth-section">
                    {usuario ? (
                        <>
                            <span className="navbar-greeting">Hola, <span>{usuario.nombre}</span></span>
                            <button onClick={cerrarSesionCompleta} className="navbar-btn-outline navbar-btn-logout">Salir</button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-btn-outline">Iniciar Sesión</Link>
                    )}

                    <Link to="/carrito" className="navbar-cart-btn">
                        🛒 Carrito
                        {cantidadTotal > 0 && (
                            <span className="navbar-cart-badge">{cantidadTotal}</span>
                        )}
                    </Link>
                </div>

                <button
                    className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            <nav className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}>
                <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>🏠 Inicio</Link>
                <Link to="/catalogo" className={isActive('/catalogo') ? 'active' : ''} onClick={() => setMenuOpen(false)}>🎮 Catálogo</Link>

                <Link to="/carrito" className={isActive('/carrito') ? 'active' : ''} onClick={() => setMenuOpen(false)}>🛒 Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}</Link>

                {usuario && !isAdmin && (
                    <Link to="/mis-pedidos" className={isActive('/mis-pedidos') ? 'active' : ''} onClick={() => setMenuOpen(false)}>📦 Mis Pedidos</Link>
                )}

                {isAdmin && (
                    <Link to="/admin" className={isActive('/admin') ? 'active' : ''} onClick={() => setMenuOpen(false)} style={{ color: '#FFD700', textShadow: '0 0 8px rgba(255, 215, 0, 0.4)' }}>
                        👑 Panel Admin
                    </Link>
                )}

                <div style={{ height: '1px', background: 'linear-gradient(90deg, #00D4FF, #7B2FBE)', margin: '10px 0', opacity: '0.3' }}></div>

                {usuario ? (
                    <>
                        <span style={{ color: '#FFFFFF', padding: '12px 0', fontWeight: 'bold' }}>👋 Hola, <span style={{ color: '#00D4FF' }}>{usuario.nombre}</span></span>
                        <button
                            onClick={() => { cerrarSesionCompleta(); setMenuOpen(false); }}
                            style={{ background: 'transparent', border: '1px solid #FF006E', color: '#FF006E', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '5px' }}
                        >
                            Salir de la cuenta
                        </button>
                    </>
                ) : (
                    <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: '#00D4FF' }}>🔑 Iniciar Sesión</Link>
                )}
            </nav>
        </>
    );
}

export default Header;