import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const landingStyles = `
/* ---- HERO ---- */
.hero {
    position: relative;
    height: 90vh;
    min-height: 500px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-image:
        linear-gradient(to bottom, rgba(6,6,18,0.3) 0%, rgba(6,6,18,0.6) 60%, rgba(6,6,18,1) 100%),
        url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070");
    background-size: cover;
    background-position: center;
}

.hero-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.hero-star {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0;
    animation: float-stars linear infinite;
}

.hero-content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    max-width: 900px;
}

.hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 4.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00D4FF 30%, #7B2FBE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.35));
    line-height: 1.1;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: #A0ADB8;
    margin-bottom: 2.5rem;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

/* ---- CATEGORÍAS ---- */
.section-categories {
    padding: 4rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.category-card {
    border-radius: 16px;
    padding: 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
    font-family: inherit;
    background: none;
    outline: none;
}

.category-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.category-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255,255,255,0.15);
}

.category-card:hover::before {
    opacity: 0.1;
}

.category-card.juegos {
    background: linear-gradient(135deg, #0a1628 0%, #0d2951 50%, #00D4FF22 100%);
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.1);
}
.category-card.juegos:hover {
    box-shadow: 0 12px 40px rgba(0, 212, 255, 0.35);
}

.category-card.consolas {
    background: linear-gradient(135deg, #1a0a28 0%, #2d1a4a 50%, #7B2FBE22 100%);
    box-shadow: 0 4px 20px rgba(123, 47, 190, 0.1);
}
.category-card.consolas:hover {
    box-shadow: 0 12px 40px rgba(123, 47, 190, 0.35);
}

.category-card.controles {
    background: linear-gradient(135deg, #0a1f0a 0%, #0d3318 50%, #00FF8822 100%);
    box-shadow: 0 4px 20px rgba(0, 255, 136, 0.1);
}
.category-card.controles:hover {
    box-shadow: 0 12px 40px rgba(0, 255, 136, 0.35);
}

.category-card.funkos {
    background: linear-gradient(135deg, #280a1a 0%, #4a0d28 50%, #FF006E22 100%);
    box-shadow: 0 4px 20px rgba(255, 0, 110, 0.1);
}
.category-card.funkos:hover {
    box-shadow: 0 12px 40px rgba(255, 0, 110, 0.35);
}

.category-icon {
    font-size: 3rem;
    line-height: 1;
}

.category-name {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #FFFFFF;
    letter-spacing: 1px;
    text-align: center;
}

/* ---- SECCIÓN TENDENCIAS ---- */
.section-trending {
    padding: 2rem 2rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

.trending-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.trending-see-all {
    text-align: center;
    margin-top: 2.5rem;
}

/* ---- OFERTA ESPECIAL BANNER ---- */
.section-offer-banner {
    background: linear-gradient(135deg, #3d0a1a 0%, #6b1a0a 50%, #c4390a 100%);
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.section-offer-banner::before {
    content: '⚡';
    position: absolute;
    font-size: 20rem;
    opacity: 0.04;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.offer-banner-inner {
    position: relative;
    z-index: 1;
    max-width: 700px;
    margin: 0 auto;
}

.offer-banner-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    color: #FFFFFF;
    text-shadow: 0 2px 15px rgba(0,0,0,0.5);
    margin-bottom: 0.75rem;
}

.offer-banner-sub {
    font-family: 'Inter', sans-serif;
    color: rgba(255,255,255,0.75);
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.btn-offer {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #FFFFFF;
    color: #c4390a;
    border: none;
    padding: 14px 36px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.btn-offer:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    background: #fff5f5;
}

/* ---- ESTADO DE CARGA ---- */
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 3rem;
    color: #A0ADB8;
}

.loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #1e1e3f;
    border-top: 3px solid #00D4FF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ---- RESPONSIVE ---- */
@media (max-width: 1024px) {
    .hero-title { font-size: 2.5rem; }
    .categories-grid { grid-template-columns: repeat(2, 1fr); }
    .trending-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    .hero-title { font-size: 1.8rem; }
    .hero { height: 80vh; }
    .categories-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .trending-grid { grid-template-columns: 1fr; }
    .offer-banner-title { font-size: 1.8rem; }
    .section-categories, .section-trending { padding-left: 1rem; padding-right: 1rem; }
}
`;

function LandingPage() {
    const [mostrarOfertas, setMostrarOfertas] = useState(false);
    const [productosTendencia, setProductosTendencia] = useState([]);
    const [todosProductos, setTodosProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { agregarAlCarrito } = useContext(CartContext);
    const navigate = useNavigate();

    // Jalamos los datos de tu API al cargar la página
    useEffect(() => {
        const fetchTendencias = async () => {
            try {
                const response = await fetch('https://localhost:7284/api/Productos');
                if (!response.ok) throw new Error('Error al cargar');
                const data = await response.json();

                // Cortamos el arreglo para mostrar solo los primeros 3 juegos en el inicio
                setProductosTendencia(data.slice(0, 3));
                // Guardamos todos para las ofertas flash
                setTodosProductos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        fetchTendencias();
    }, []);

    // Navegar al catálogo con filtro de categoría preseleccionado
    const irACategoria = (categoria) => {
        navigate('/catalogo', { state: { categoriaInicial: categoria } });
    };

    // Productos para las ofertas flash (los que tienen menos stock = más urgencia)
    const productosOferta = todosProductos
        .slice(0, 4)
        .map(p => ({ ...p, precioOriginal: (p.precio * 1.4).toFixed(2) }));

    // Genera estrellas para el fondo del hero
    const stars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        duration: `${Math.random() * 8 + 6}s`,
        delay: `${Math.random() * 8}s`,
        top: `${Math.random() * 100}%`,
    }));

    return (
        <>
            <style>{landingStyles}</style>

            {/* ===== 1. HERO BANNER ===== */}
            <section className="hero">
                {/* Partículas/estrellas */}
                <div className="hero-stars">
                    {stars.map(star => (
                        <div
                            key={star.id}
                            className="hero-star"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: star.width,
                                height: star.height,
                                animationDuration: star.duration,
                                animationDelay: star.delay,
                            }}
                        />
                    ))}
                </div>

                <div className="hero-content">
                    <h1 className="hero-title">Sube de Nivel.</h1>
                    <p className="hero-subtitle">
                        Encuentra los mejores títulos, consolas y accesorios.<br />
                        Tu siguiente aventura gaming comienza aquí.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/catalogo" className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
                            🎮 Explorar Catálogo
                        </Link>
                    </div>


                </div>
            </section>

            {/* ===== 2. CATEGORÍAS RÁPIDAS ===== */}
            <section className="section-categories">
                <h2 className="section-title">Explorar por Categoría</h2>
                <div className="categories-grid">
                    <button onClick={() => irACategoria('Juegos')} className="category-card juegos">
                        <span className="category-icon">🕹️</span>
                        <span className="category-name">Videojuegos</span>
                    </button>
                    <button onClick={() => irACategoria('Consolas')} className="category-card consolas">
                        <span className="category-icon">🎮</span>
                        <span className="category-name">Consolas</span>
                    </button>
                    <button onClick={() => irACategoria('Controles')} className="category-card controles">
                        <span className="category-icon">🕹</span>
                        <span className="category-name">Controles</span>
                    </button>
                    <button onClick={() => irACategoria('Funko Pops')} className="category-card funkos">
                        <span className="category-icon">🧸</span>
                        <span className="category-name">Funko Pops</span>
                    </button>
                </div>
            </section>

            {/* ===== 3. TENDENCIAS / DATOS REALES ===== */}
            <section className="section-trending">
                <h2 className="section-title">🔥 Lo Más Jugado Esta Semana</h2>

                {cargando ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Cargando tendencias...</p>
                    </div>
                ) : (
                    <>
                        <div className="trending-grid">
                            {productosTendencia.map((producto) => (
                                <Link key={producto.id} to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="product-card">
                                        <div className="product-card-img-wrapper">
                                            <img
                                                src={producto.imagenes && producto.imagenes.length > 0
                                                    ? producto.imagenes[0].url
                                                    : 'https://via.placeholder.com/600x300?text=Sin+Imagen'}
                                                alt={producto.nombre}
                                            />
                                            <span className="badge badge-hot">🔥 HOT</span>
                                        </div>
                                        <div className="product-card-body">
                                            <h3 className="product-card-title">{producto.nombre}</h3>
                                            <span className={`product-card-stock ${producto.stock < 5 ? 'ultimas' : 'disponible'}`}>
                                                {producto.stock < 5 ? `⚠️ ¡Últimas ${producto.stock} unidades!` : `✓ En stock · ${producto.stock} uds.`}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                                                <span className="product-card-price">${producto.precio?.toFixed(2)}</span>
                                            </div>
                                            <button
                                                className="product-card-btn"
                                                onClick={(e) => { e.preventDefault(); agregarAlCarrito(producto); }}
                                            >
                                                🛒 Añadir al Carrito
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="trending-see-all">
                            <Link to="/catalogo" className="btn-secondary">
                                Ver Todo el Catálogo →
                            </Link>
                        </div>
                    </>
                )}
            </section>

            {/* ===== 4. BANNER OFERTA ESPECIAL ===== */}
            <section className="section-offer-banner">
                <div className="offer-banner-inner">
                    <h2 className="offer-banner-title">¿Buscas un descuento especial? ⚡</h2>
                    <p className="offer-banner-sub">Desbloquea nuestras ofertas exclusivas por tiempo limitado. ¡No te quedes sin ellas!</p>
                    <button
                        onClick={() => setMostrarOfertas(!mostrarOfertas)}
                        className="btn-offer"
                    >
                        {mostrarOfertas ? '✕ Ocultar Ofertas' : '⚡ Ver Ofertas Flash'}
                    </button>
                </div>

                {/* PRODUCTOS EN OFERTA - se despliegan al presionar el botón */}
                {mostrarOfertas && (
                    <div style={{
                        maxWidth: '1200px',
                        margin: '3rem auto 0',
                        padding: '0 1rem'
                    }}>
                        {productosOferta.length === 0 ? (
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter,sans-serif', textAlign: 'center' }}>Cargando ofertas...</p>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                                gap: '20px'
                            }}>
                                {productosOferta.map(producto => (
                                    <Link
                                        key={producto.id}
                                        to={`/producto/${producto.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className="product-card" style={{ border: '1px solid #FF006E', boxShadow: '0 0 16px rgba(255,0,110,0.2)' }}>
                                            <div className="product-card-img-wrapper">
                                                <img
                                                    src={producto.imagenes && producto.imagenes.length > 0
                                                        ? producto.imagenes[0].url
                                                        : 'https://via.placeholder.com/400x300?text=Oferta'}
                                                    alt={producto.nombre}
                                                />
                                                <span className="badge badge-oferta">-40% OFERTA</span>
                                            </div>
                                            <div className="product-card-body">
                                                <h3 className="product-card-title">{producto.nombre}</h3>
                                                <span className="product-card-price-original">${producto.precioOriginal}</span>
                                                <span className="product-card-price" style={{ color: '#FF006E' }}>${producto.precio?.toFixed(2)}</span>
                                                <button
                                                    className="product-card-btn"
                                                    style={{ background: 'linear-gradient(135deg, #FF006E, #7B2FBE)' }}
                                                    onClick={(e) => { e.preventDefault(); agregarAlCarrito(producto); }}
                                                >
                                                    🛒 Añadir al Carrito
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}

export default LandingPage;