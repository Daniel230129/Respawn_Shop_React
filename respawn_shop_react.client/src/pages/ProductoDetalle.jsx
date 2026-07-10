import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductoDetalle() {
    // Sacamos el ID directamente de la URL
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Conectamos el cerebro del carrito
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                // Llamamos a tu API de .NET pero solo pidiendo el juego específico
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

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '30px', flexWrap: 'wrap', backgroundColor: '#1e1e1e', padding: '2rem', borderRadius: '15px', border: '1px solid #333' }}>

            {/* Columna de la Imagen */}
            <div style={{ flex: '1', minWidth: '300px' }}>
                <img
                    src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : 'https://via.placeholder.com/400x400?text=Sin+Imagen'}
                    alt={producto.nombre}
                    style={{ width: '100%', borderRadius: '10px', backgroundColor: '#111', objectFit: 'contain', height: '100%', maxHeight: '400px' }}
                />
            </div>

            {/* Columna de la Información */}
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Link to="/catalogo" style={{ color: '#aaa', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Volver al catálogo
                </Link>
                <h1 style={{ margin: '0 0 10px 0', color: '#007bff', fontSize: '2.5rem' }}>{producto.nombre}</h1>
                <p style={{ color: '#00c864', fontWeight: 'bold', fontSize: '2rem', margin: '0 0 20px 0' }}>${producto.precio?.toFixed(2)}</p>

                {/* Aquí puedes mostrar la descripción si tu API la devuelve */}
                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {producto.descripcion ? producto.descripcion : "Un excelente título para añadir a tu colección. Disfruta de horas de entretenimiento con este increíble producto de Respawn Shop."}
                </p>

                <p style={{ color: '#888', marginBottom: '30px' }}>Disponibles en inventario: <strong>{producto.stock} unidades</strong></p>

                <button
                    onClick={() => agregarAlCarrito(producto)}
                    style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', width: '100%', transition: '0.3s' }}
                >
                    Añadir al Carrito 🛒
                </button>
            </div>

        </div>
    );
}

export default ProductoDetalle;