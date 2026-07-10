import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // 1. IMPORTAMOS EL CONTEXTO

function Header() {
    // 2. SACAMOS EL CARRITO DEL CEREBRO GLOBAL
    const { carrito } = useContext(CartContext);

    // 3. CALCULAMOS LA CANTIDAD REAL DE JUEGOS
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <header style={{ backgroundColor: '#121212', padding: '1rem 2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #007bff' }}>
            <h2 style={{ margin: 0 }}>🎮 Respawn Shop</h2>

            <nav style={{ display: 'flex', gap: '20px' }}>
                <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Inicio</Link>
                <Link to="/catalogo" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Catálogo</Link>
                <Link to="/carrito" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Carrito</Link>
            </nav>

            {/* 4. MOSTRAMOS LA CANTIDAD REAL EN EL BOTÓN */}
            <Link to="/carrito" style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                    🛒 Carrito: {cantidadTotal}
                </button>
            </Link>
        </header>
    );
}

export default Header;