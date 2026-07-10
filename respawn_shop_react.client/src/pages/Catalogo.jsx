import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'; // Añadimos useContext aquí
import { CartContext } from '../context/CartContext'; // Importamos el cerebro

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // 1. EXTRAEMOS LA FUNCIÓN DEL CEREBRO GLOBAL AQUÍ ADENTRO
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://localhost:7284/api/Productos');

                if (!response.ok) {
                    throw new Error('Fallo al conectar con la base de datos.');
                }

                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, []);

    if (cargando) return <h2 style={{ textAlign: 'center', marginTop: '3rem', color: '#007bff' }}>Cargando inventario... ⏳</h2>;
    if (error) return <h2 style={{ textAlign: 'center', marginTop: '3rem', color: '#ff4d4d' }}>Error: {error} ❌</h2>;

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#007bff', marginBottom: '2rem' }}>🎮 Catálogo de Productos</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>

                {productos.map((producto) => (
                    <div key={producto.id} style={{ backgroundColor: '#1e1e1e', borderRadius: '10px', padding: '15px', border: '1px solid #333', display: 'flex', flexDirection: 'column' }}>

                        {/* Envolvemos la imagen y el título en un Link para ir a los detalles */}
                        <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img
                                src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : 'https://via.placeholder.com/250x150?text=Sin+Imagen'}
                                alt={producto.nombre}
                                style={{ width: '100%', height: '160px', objectFit: 'contain', borderRadius: '5px', marginBottom: '10px', backgroundColor: '#111' }}
                            />
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{producto.nombre}</h3>
                        </Link>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', flex: '1', margin: 0 }}>Stock: {producto.stock} uds.</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#00c864' }}>
                                ${producto.precio?.toFixed(2)}
                            </span>

                            {/* 2. EL BOTÓN AHORA SÍ CONOCE LA FUNCIÓN */}
                            <button
                                onClick={() => agregarAlCarrito(producto)}
                                style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Añadir
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;