import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const catalogoStyles = `
.catalogo-page {
    min-height: 80vh;
    padding: 3rem 2rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

.catalogo-header {
    text-align: center;
    margin-bottom: 3rem;
}

.catalogo-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
    filter: drop-shadow(0 0 12px rgba(0,212,255,0.25));
}

.catalogo-title-line {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, #00D4FF, #7B2FBE);
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: 0 0 12px rgba(0,212,255,0.5);
}

/* Barra de filtros */
.catalogo-filters {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    padding: 1.25rem 1.5rem;
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 16px;
}

.filter-chip {
    padding: 8px 18px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #1e1e3f;
    background: transparent;
    color: #A0ADB8;
}

.filter-chip:hover {
    border-color: #00D4FF;
    color: #00D4FF;
}

.filter-chip.active {
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    border-color: transparent;
    color: #FFFFFF;
    box-shadow: 0 0 15px rgba(0,212,255,0.3);
}

.filter-search {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #0a0a1a;
    border: 1px solid #00D4FF;
    border-radius: 50px;
    padding: 8px 16px;
    min-width: 220px;
}

.filter-search input {
    background: transparent;
    border: none;
    outline: none;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    width: 100%;
}

.filter-search input::placeholder {
    color: #A0ADB8;
}

.filter-search-icon {
    color: #00D4FF;
    font-size: 1rem;
    flex-shrink: 0;
}

/* Grid catálogo */
.catalogo-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}

/* Estado de carga */
.catalogo-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 5rem;
    color: #A0ADB8;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1rem;
}

.catalogo-spinner {
    width: 56px;
    height: 56px;
    border: 3px solid #1e1e3f;
    border-top: 3px solid #00D4FF;
    border-right: 3px solid #7B2FBE;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

.catalogo-error {
    text-align: center;
    padding: 4rem;
    color: #FF006E;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
}

/* Paginación / ver más */
.catalogo-footer {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
}

/* RESPONSIVE */
@media (max-width: 1400px) {
    .catalogo-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 1024px) {
    .catalogo-grid { grid-template-columns: repeat(3, 1fr); }
    .catalogo-title { font-size: 2rem; }
}
@media (max-width: 768px) {
    .catalogo-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .catalogo-title { font-size: 1.6rem; }
    .catalogo-filters { flex-direction: column; align-items: flex-start; }
    .filter-search { margin-left: 0; width: 100%; }
    .catalogo-page { padding: 2rem 1rem; }
}
`;

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // null = "Todos", número = id de categoría seleccionada
    const [categoriaActiva, setCategoriaActiva] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    // 1. EXTRAEMOS LA FUNCIÓN DEL CEREBRO GLOBAL AQUÍ ADENTRO
    const { agregarAlCarrito } = useContext(CartContext);

    // Leer el filtro de categoría que viene desde la Landing Page (por nombre)
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargamos productos Y categorías en paralelo
                const [resProductos, resCategorias] = await Promise.all([
                    fetch('https://localhost:7284/api/Productos'),
                    fetch('https://localhost:7284/api/Categorias'),
                ]);

                if (!resProductos.ok) throw new Error('Fallo al conectar con la base de datos.');

                const dataProductos = await resProductos.json();
                setProductos(dataProductos);

                if (resCategorias.ok) {
                    const dataCategorias = await resCategorias.json();
                    setCategorias(dataCategorias);

                    // Si llegamos desde la landing con un nombre de categoría,
                    // buscamos el ID correspondiente para hacer el filtro exacto
                    if (location.state?.categoriaInicial) {
                        const nombreBuscado = location.state.categoriaInicial.toLowerCase();
                        const catEncontrada = dataCategorias.find(c =>
                            c.nombre?.toLowerCase().includes(nombreBuscado) ||
                            nombreBuscado.includes(c.nombre?.toLowerCase())
                        );
                        if (catEncontrada) {
                            setCategoriaActiva(catEncontrada.id);
                        }
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        fetchData();
    }, []); // Solo al montar

    if (cargando) return (
        <>
            <style>{catalogoStyles}</style>
            <div className="catalogo-loading">
                <div className="catalogo-spinner"></div>
                <span>Cargando inventario...</span>
            </div>
        </>
    );

    if (error) return (
        <>
            <style>{catalogoStyles}</style>
            <div className="catalogo-error">❌ Error: {error}</div>
        </>
    );

    // Filtrar por categoría (match exacto por ID) y por búsqueda de texto
    const productosFiltrados = productos.filter(p => {
        const matchBusqueda = p.nombre?.toLowerCase().includes(busqueda.toLowerCase());
        const matchCategoria = categoriaActiva === null || p.categoriaId === categoriaActiva;
        return matchBusqueda && matchCategoria;
    });

    return (
        <>
            <style>{catalogoStyles}</style>
            <div className="catalogo-page">

                {/* HEADER */}
                <div className="catalogo-header">
                    <h1 className="catalogo-title">🎮 Catálogo de Productos</h1>
                    <div className="catalogo-title-line"></div>
                </div>

                {/* BARRA DE FILTROS — chips dinámicos desde la API */}
                <div className="catalogo-filters">
                    {/* Chip "Todos" */}
                    <button
                        className={`filter-chip${categoriaActiva === null ? ' active' : ''}`}
                        onClick={() => setCategoriaActiva(null)}
                    >
                        Todos
                    </button>

                    {/* Chips dinámicos por cada categoría real de la BD */}
                    {categorias.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-chip${categoriaActiva === cat.id ? ' active' : ''}`}
                            onClick={() => setCategoriaActiva(cat.id)}
                        >
                            {cat.nombre}
                        </button>
                    ))}

                    <div className="filter-search">
                        <span className="filter-search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                {/* GRID DE PRODUCTOS */}
                <div className="catalogo-grid">
                    {productosFiltrados.map((producto) => (
                        <div key={producto.id} className="product-card">
                            {/* Imagen con link */}
                            <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                <div className="product-card-img-wrapper">
                                    <img
                                        src={producto.imagenes && producto.imagenes.length > 0
                                            ? producto.imagenes[0].url
                                            : 'https://via.placeholder.com/250x200?text=Sin+Imagen'}
                                        alt={producto.nombre}
                                    />
                                    {producto.stock < 5 && (
                                        <span className="badge badge-oferta">OFERTA</span>
                                    )}
                                    {producto.stock >= 5 && producto.stock < 10 && (
                                        <span className="badge badge-nuevo">NUEVO</span>
                                    )}
                                </div>
                            </Link>

                            <div className="product-card-body">
                                <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h3 className="product-card-title">{producto.nombre}</h3>
                                </Link>

                                <span className={`product-card-stock ${producto.stock < 5 ? 'ultimas' : 'disponible'}`}>
                                    {producto.stock < 5
                                        ? `⚠️ ¡Últimas ${producto.stock} uds.!`
                                        : `✓ Stock: ${producto.stock} uds.`}
                                </span>

                                <span className="product-card-price">${producto.precio?.toFixed(2)}</span>

                                {/* 2. EL BOTÓN AHORA SÍ CONOCE LA FUNCIÓN */}
                                <button
                                    onClick={() => agregarAlCarrito(producto)}
                                    className="product-card-btn"
                                >
                                    🛒 Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {productosFiltrados.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#A0ADB8' }}>
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
                        <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem' }}>No se encontraron productos</p>
                    </div>
                )}

                {/* BOTÓN CARGAR MÁS */}
                {productosFiltrados.length > 0 && (
                    <div className="catalogo-footer">
                        <button className="btn-secondary">
                            Cargar Más Productos ↓
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Catalogo;