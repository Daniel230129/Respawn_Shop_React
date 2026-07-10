import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [mostrarOfertas, setMostrarOfertas] = useState(false);

    // Estados para los juegos dinámicos
    const [productosTendencia, setProductosTendencia] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Jalamos los datos de tu API al cargar la página
    useEffect(() => {
        const fetchTendencias = async () => {
            try {
                const response = await fetch('https://localhost:7284/api/Productos');
                if (!response.ok) throw new Error('Error al cargar');
                const data = await response.json();

                // Cortamos el arreglo para mostrar solo los primeros 3 juegos en el inicio
                setProductosTendencia(data.slice(0, 3));
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        fetchTendencias();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>

            {/* 1. HERO BANNER PRINCIPAL */}
            <div style={{
                position: 'relative',
                height: '50vh',
                minHeight: '400px',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(13,17,23,0.9)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
                padding: '20px',
                border: '1px solid #30363d'
            }}>
                <div>
                    <h1 style={{ fontSize: '4.5rem', color: '#ffffff', margin: '0 0 10px 0', textShadow: '2px 2px 10px rgba(0,0,0,0.8)', fontWeight: '900' }}>
                        Sube de Nivel.
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: '#c9d1d9', marginBottom: '30px', textShadow: '1px 1px 5px rgba(0,0,0,0.8)' }}>
                        Encuentra los mejores títulos y accesorios en un solo lugar.
                    </p>
                    <Link to="/catalogo">
                        <button style={{ backgroundColor: '#005cc5', color: 'white', padding: '15px 40px', fontSize: '1.2rem', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s', boxShadow: '0 4px 15px rgba(0, 92, 197, 0.4)' }}>
                            Explorar Catálogo
                        </button>
                    </Link>
                </div>
            </div>

            {/* 2. SECCIÓN TENDENCIAS (DATOS REALES) */}
            <div>
                <h2 style={{ color: '#ffffff', borderLeft: '4px solid #005cc5', paddingLeft: '15px', marginBottom: '20px' }}>🔥 Lo Más Jugado Esta Semana</h2>

                {cargando ? (
                    <p style={{ color: '#8b949e' }}>Cargando tendencias...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {productosTendencia.map((producto) => (
                            <Link key={producto.id} to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ backgroundColor: '#161b22', borderRadius: '15px', overflow: 'hidden', border: '1px solid #30363d', transition: 'transform 0.2s', cursor: 'pointer' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>

                                    <img
                                        src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : 'https://via.placeholder.com/600x300?text=Sin+Imagen'}
                                        alt={producto.nombre}
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', backgroundColor: '#111' }}
                                    />
                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '1.3rem' }}>{producto.nombre}</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ margin: '0', color: '#2ea043', fontWeight: 'bold', fontSize: '1.2rem' }}>${producto.precio?.toFixed(2)}</p>
                                            <span style={{ backgroundColor: '#005cc5', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>Ver Detalles</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. SECCIÓN OFERTAS FLASH */}
            <div style={{ backgroundColor: '#161b22', padding: '40px', borderRadius: '20px', border: '1px solid #30363d', textAlign: 'center' }}>
                <h2 style={{ color: '#ffffff', marginBottom: '15px' }}>¿Buscas un descuento especial?</h2>
                <p style={{ color: '#8b949e', marginBottom: '25px' }}>Desbloquea nuestras ofertas secretas por tiempo limitado.</p>

                <button
                    onClick={() => setMostrarOfertas(!mostrarOfertas)}
                    style={{ backgroundColor: mostrarOfertas ? '#21262d' : '#da3633', color: 'white', padding: '15px 30px', fontSize: '1.2rem', border: mostrarOfertas ? '1px solid #30363d' : 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
                >
                    {mostrarOfertas ? "Ocultar Ofertas" : "Ver Ofertas Flash ⚡"}
                </button>

                {mostrarOfertas && (
                    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#0d1117', borderRadius: '10px', border: '2px dashed #da3633', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'left', backgroundColor: '#161b22', padding: '15px', borderRadius: '10px', width: '250px' }}>
                            <h3 style={{ color: '#da3633', margin: '0 0 10px 0' }}>-40% en Controles</h3>
                            <p style={{ color: '#c9d1d9', margin: 0, fontSize: '0.9rem' }}>Aplica para mandos de PS5 y Xbox Series X.</p>
                        </div>
                        <div style={{ textAlign: 'left', backgroundColor: '#161b22', padding: '15px', borderRadius: '10px', width: '250px' }}>
                            <h3 style={{ color: '#da3633', margin: '0 0 10px 0' }}>2x1 en Clásicos</h3>
                            <p style={{ color: '#c9d1d9', margin: 0, fontSize: '0.9rem' }}>Llévate dos juegos retro por el precio de uno.</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default LandingPage;