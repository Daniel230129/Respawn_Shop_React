import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductoDetalle() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);

    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`https://localhost:7284/api/Productos/${id}`);
                if (!response.ok) throw new Error('Error al cargar el producto');
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (cargando) return <h2 style={{ textAlign: 'center', marginTop: '3rem', color: '#007bff' }}>Cargando detalles... ⏳</h2>;
    if (!producto) return <h2 style={{ textAlign: 'center', marginTop: '3rem', color: '#ff4d4d' }}>Juego no encontrado ❌</h2>;

    // Calculamos las cuotas para que se vea como en la imagen
    const cuotas = (producto.precio / 6).toFixed(2);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap', backgroundColor: '#0d1117', padding: '2rem', borderRadius: '15px' }}>

            {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
            <div style={{ flex: '1', minWidth: '350px' }}>
                <img
                    src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : 'https://via.placeholder.com/500x500?text=Sin+Imagen'}
                    alt={producto.nombre}
                    style={{ width: '100%', borderRadius: '15px', objectFit: 'cover', border: '1px solid #30363d', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                />
            </div>

            {/* --- COLUMNA DERECHA: INFORMACIÓN --- */}
            <div style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>

                {/* Enlace de regreso */}
                <Link to="/catalogo" style={{ color: '#8b949e', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    ← Volver al catálogo
                </Link>

                {/* Badges / Etiquetas */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#005cc5', color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>JUEGOS</span>
                    <span style={{ backgroundColor: '#005cc5', color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>DIGITAL</span>
                </div>

                {/* Título y Género */}
                <h1 style={{ margin: '5px 0', color: '#ffffff', fontSize: '2.5rem', fontWeight: '900' }}>{producto.nombre}</h1>
                <p style={{ color: '#8b949e', margin: '5px 0 10px 0', fontSize: '1rem' }}>🎭 Género: {producto.categoria?.nombre || 'Acción / Aventura'}</p>

                {/* Reseñas (Simuladas) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', color: '#e3b341', fontSize: '1.2rem' }}>
                    ★★★★☆ <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>(124 reseñas)</span>
                </div>

                {/* CAJA DE PRECIO Y CARRITO (El recuadro azul oscuro) */}
                <div style={{ backgroundColor: '#161b22', padding: '25px', borderRadius: '15px', border: '1px solid #30363d', marginBottom: '25px' }}>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '2.8rem', color: '#ffffff', fontWeight: 'bold' }}>
                        $ {producto.precio?.toFixed(2)}
                    </h2>
                    <p style={{ margin: '0 0 20px 0', color: '#8b949e', fontSize: '0.95rem' }}>
                        💳 O en 6 cuotas de $ {cuotas} sin intereses
                    </p>

                    {/* Estado del Stock */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <span style={{ backgroundColor: '#2ea043', color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                            ⚡ EN STOCK
                        </span>
                        <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>
                            <strong>{producto.stock}</strong> unidades disponibles
                        </span>
                    </div>

                    {/* Botones */}
                    <button
                        onClick={() => alert('Redirigiendo a pasarela de pago...')}
                        style={{ width: '100%', backgroundColor: '#005cc5', color: 'white', padding: '16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                    >
                        🛒 COMPRAR AHORA
                    </button>

                    <button
                        onClick={() => agregarAlCarrito(producto)}
                        style={{ width: '100%', backgroundColor: 'transparent', color: '#c9d1d9', padding: '15px', borderRadius: '8px', border: '1px solid #30363d', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#21262d'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        + Añadir al Carrito
                    </button>
                </div>

                {/* Políticas de la tienda */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '0 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#c9d1d9', fontSize: '0.95rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🚚</span> Envío gratis a Santo Domingo y Viejo Arroyo Hondo
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#c9d1d9', fontSize: '0.95rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🔄</span> 30 días para devoluciones sin costo
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#c9d1d9', fontSize: '0.95rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🔒</span> Garantía oficial de 12 meses
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductoDetalle;