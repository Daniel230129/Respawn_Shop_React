import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const detalleStyles = `
.detalle-page {
    padding: 3rem 2rem 5rem;
    max-width: 1100px;
    margin: 0 auto;
}

.detalle-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #A0ADB8;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    transition: color 0.3s;
}
.detalle-back:hover { color: #00D4FF; }

.detalle-layout {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 3rem;
    align-items: start;
}

/* ---- COLUMNA IMAGEN ---- */
.detalle-img-col {
    position: sticky;
    top: 90px;
}

.detalle-img-wrapper {
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(135deg, #0a0a1a, #111128);
    border: 1px solid #1e1e3f;
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.12), 0 20px 60px rgba(0,0,0,0.5);
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.detalle-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.detalle-img-wrapper:hover img {
    transform: scale(1.04);
}

/* ---- COLUMNA INFO ---- */
.detalle-info-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.detalle-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.detalle-badge {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding: 5px 12px;
    border-radius: 50px;
}

.detalle-badge.tipo-juego {
    background: linear-gradient(135deg, #00D4FF22, #00D4FF44);
    border: 1px solid #00D4FF;
    color: #00D4FF;
}

.detalle-badge.tipo-digital {
    background: linear-gradient(135deg, #7B2FBE22, #7B2FBE44);
    border: 1px solid #7B2FBE;
    color: #7B2FBE;
}

.detalle-badge.tipo-genero {
    background: linear-gradient(135deg, #FF006E22, #FF006E44);
    border: 1px solid #FF006E;
    color: #FF006E;
}

.detalle-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1.15;
    text-shadow: 0 2px 20px rgba(0,0,0,0.5);
}

.detalle-genre {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
}

.detalle-stars {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #FFD700;
    font-size: 1.3rem;
    filter: drop-shadow(0 0 6px rgba(255,215,0,0.5));
}

.detalle-stars span {
    color: #A0ADB8;
    font-size: 0.9rem;
    filter: none;
}

/* Caja de precio */
.detalle-price-box {
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.detalle-price {
    font-family: 'Rajdhani', sans-serif;
    font-size: 3.2rem;
    font-weight: 700;
    color: #00FF88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.35);
    line-height: 1;
}

.detalle-cuotas {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    margin-top: -8px;
}

.detalle-stock-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 255, 136, 0.12);
    border: 1px solid #00FF88;
    color: #00FF88;
    padding: 6px 14px;
    border-radius: 8px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    width: fit-content;
}

.detalle-stock-icon {
    animation: blink-icon 1.5s ease-in-out infinite;
}

.detalle-stock-units {
    color: #A0ADB8;
    font-size: 0.88rem;
}

/* Botón COMPRAR AHORA */
.detalle-btn-buy {
    width: 100%;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    color: white;
    border: none;
    padding: 18px;
    border-radius: 12px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0,212,255,0.25), 0 4px 20px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
}

.detalle-btn-buy::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-20deg);
}

.detalle-btn-buy:hover::after {
    animation: shimmer 0.6s ease forwards;
}

.detalle-btn-buy:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(0,212,255,0.5), 0 8px 30px rgba(123,47,190,0.3);
}

/* Botón Añadir al Carrito */
.detalle-btn-cart {
    width: 100%;
    background: transparent;
    color: #00D4FF;
    border: 2px solid #00D4FF;
    padding: 14px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.detalle-btn-cart:hover {
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    color: white;
    border-color: transparent;
    box-shadow: 0 4px 20px rgba(0,212,255,0.3);
}

/* Descripción del producto */
.detalle-description {
    background: #0d0d22;
    border-left: 3px solid #00D4FF;
    border-radius: 0 10px 10px 0;
    padding: 16px 20px;
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    line-height: 1.7;
}

.detalle-description-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    color: #00D4FF;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
}

/* Beneficios */
.detalle-benefits {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.detalle-benefit {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 10px;
    padding: 12px 16px;
    transition: border-color 0.3s;
}

.detalle-benefit:hover {
    border-color: #1e1e3f;
}

.detalle-benefit-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
}

.detalle-benefit-text {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    line-height: 1.4;
}

.detalle-benefit-text strong {
    color: #FFFFFF;
    display: block;
    font-size: 0.95rem;
    margin-bottom: 2px;
}

/* Estados loading / error */
.detalle-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 6rem;
    color: #A0ADB8;
    font-family: 'Orbitron', sans-serif;
}

.detalle-spinner {
    width: 56px;
    height: 56px;
    border: 3px solid #1e1e3f;
    border-top: 3px solid #00D4FF;
    border-right: 3px solid #7B2FBE;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

/* RESPONSIVE */
@media (max-width: 768px) {
    .detalle-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .detalle-img-col { position: static; }
    .detalle-title { font-size: 1.8rem; }
    .detalle-price { font-size: 2.4rem; }
    .detalle-page { padding: 2rem 1rem; }
}
`;

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

    if (cargando) return (
        <>
            <style>{detalleStyles}</style>
            <div className="detalle-loading">
                <div className="detalle-spinner"></div>
                <span>Cargando detalles...</span>
            </div>
        </>
    );

    if (!producto) return (
        <>
            <style>{detalleStyles}</style>
            <div className="detalle-loading" style={{ color: '#FF006E' }}>
                <span style={{ fontSize: '3rem' }}>❌</span>
                <span>Producto no encontrado</span>
            </div>
        </>
    );

    // Calculamos las cuotas para que se vea como en la imagen
    const cuotas = (producto.precio / 6).toFixed(2);

    return (
        <>
            <style>{detalleStyles}</style>
            <div className="detalle-page">
                {/* Enlace de regreso */}
                <Link to="/catalogo" className="detalle-back">
                    ← Volver al catálogo
                </Link>

                <div className="detalle-layout">
                    {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
                    <div className="detalle-img-col">
                        <div className="detalle-img-wrapper">
                            <img
                                src={producto.imagenes && producto.imagenes.length > 0
                                    ? producto.imagenes[0].url
                                    : 'https://via.placeholder.com/500x500?text=Sin+Imagen'}
                                alt={producto.nombre}
                            />
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: INFORMACIÓN --- */}
                    <div className="detalle-info-col">
                        {/* Badges / Etiquetas */}
                        <div className="detalle-badges">
                            <span className="detalle-badge tipo-juego">JUEGOS</span>
                            <span className="detalle-badge tipo-digital">DIGITAL</span>
                            {producto.categoria?.nombre && (
                                <span className="detalle-badge tipo-genero">{producto.categoria.nombre}</span>
                            )}
                        </div>

                        {/* Título y Género */}
                        <div>
                            <h1 className="detalle-title">{producto.nombre}</h1>
                            <p className="detalle-genre">🎭 Género: {producto.categoria?.nombre || 'Acción / Aventura'}</p>
                        </div>

                        {/* Reseñas (Simuladas) */}
                        <div className="detalle-stars">
                            ★★★★☆
                            <span>(124 reseñas)</span>
                        </div>

                        {/* Descripción del producto */}
                        {producto.descripcion && (
                            <div className="detalle-description">
                                <span className="detalle-description-title">Descripción</span>
                                {producto.descripcion}
                            </div>
                        )}
                        {/* CAJA DE PRECIO Y CARRITO */}
                        <div className="detalle-price-box">
                            <div>
                                <div className="detalle-price">${producto.precio?.toFixed(2)}</div>
                                <p className="detalle-cuotas">
                                    💳 O en 6 cuotas de ${cuotas} sin intereses
                                </p>
                            </div>

                            {/* Estado del Stock */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <span className="detalle-stock-badge">
                                    <span className="detalle-stock-icon">⚡</span>
                                    EN STOCK
                                </span>
                                <span className="detalle-stock-units">
                                    <strong>{producto.stock}</strong> unidades disponibles
                                </span>
                            </div>

                            {/* Botones */}
                            <button
                                onClick={() => alert('Redirigiendo a pasarela de pago...')}
                                className="detalle-btn-buy"
                            >
                                🛒 COMPRAR AHORA
                            </button>

                            <button
                                onClick={() => agregarAlCarrito(producto)}
                                className="detalle-btn-cart"
                            >
                                + Añadir al Carrito
                            </button>
                        </div>

                        {/* Políticas de la tienda */}
                        <div className="detalle-benefits">
                            <div className="detalle-benefit">
                                <span className="detalle-benefit-icon">🚚</span>
                                <div className="detalle-benefit-text">
                                    <strong>Envío Gratis</strong>
                                    Santo Domingo y Viejo Arroyo Hondo
                                </div>
                            </div>
                            <div className="detalle-benefit">
                                <span className="detalle-benefit-icon">🔄</span>
                                <div className="detalle-benefit-text">
                                    <strong>Devoluciones Sin Costo</strong>
                                    30 días para cambios y devoluciones
                                </div>
                            </div>
                            <div className="detalle-benefit">
                                <span className="detalle-benefit-icon">🔒</span>
                                <div className="detalle-benefit-text">
                                    <strong>Garantía Oficial</strong>
                                    12 meses de garantía del fabricante
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductoDetalle;