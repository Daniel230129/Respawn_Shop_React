import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const carritoStyles = `
.carrito-page {
    padding: 3rem 2rem 5rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 70vh;
}

.carrito-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 2.5rem;
    filter: drop-shadow(0 0 10px rgba(0,212,255,0.25));
}

/* ---- CARRITO VACÍO ---- */
.carrito-vacio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
    gap: 20px;
}

.carrito-vacio-icon {
    font-size: 5rem;
    display: inline-block;
    filter: drop-shadow(0 0 20px rgba(0,212,255,0.5));
    animation: pulse-neon-cart 2s ease-in-out infinite;
}

@keyframes pulse-neon-cart {
    0%, 100% {
        filter: drop-shadow(0 0 10px rgba(0,212,255,0.4));
        transform: scale(1);
    }
    50% {
        filter: drop-shadow(0 0 25px rgba(0,212,255,0.8));
        transform: scale(1.05);
    }
}

.carrito-vacio-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #FFFFFF;
}

.carrito-vacio-sub {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
}

/* ---- CARRITO CON PRODUCTOS ---- */
.carrito-layout {
    display: grid;
    grid-template-columns: 65% 35%;
    gap: 2rem;
    align-items: start;
}

/* Lista de items */
.carrito-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.carrito-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 16px;
    padding: 16px;
    transition: all 0.3s ease;
}

.carrito-item:hover {
    border-color: rgba(0,212,255,0.3);
    box-shadow: 0 0 15px rgba(0,212,255,0.08);
}

.carrito-item-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
    flex-shrink: 0;
    background: #0a0a1a;
}

.carrito-item-info {
    flex: 1;
    min-width: 0;
}

.carrito-item-name {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #FFFFFF;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.carrito-item-unit {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #A0ADB8;
}

.carrito-item-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.carrito-item-price {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #00FF88;
    min-width: 80px;
    text-align: right;
    flex-shrink: 0;
}

.carrito-qty-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid #00D4FF;
    color: #00D4FF;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    line-height: 1;
    flex-shrink: 0;
}

.carrito-qty-btn:hover {
    background: #00D4FF;
    color: #060612;
}

.carrito-qty-num {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #FFFFFF;
    min-width: 20px;
    text-align: center;
}

.carrito-remove-btn {
    background: transparent;
    border: 1px solid #FF006E;
    color: #FF006E;
    padding: 6px 12px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.carrito-remove-btn:hover {
    background: #FF006E;
    color: white;
}

/* ---- RESUMEN DEL PEDIDO ---- */
.carrito-resumen {
    background: #111128;
    border: 1px solid #00D4FF;
    border-radius: 16px;
    padding: 24px;
    position: sticky;
    top: 90px;
    box-shadow: 0 0 20px rgba(0,212,255,0.1);
}

.carrito-resumen-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 20px;
    letter-spacing: 1px;
}

.resumen-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-family: 'Inter', sans-serif;
}

.resumen-row-label {
    color: #A0ADB8;
    font-size: 0.95rem;
}

.resumen-row-value {
    color: #FFFFFF;
    font-weight: 600;
    font-size: 0.95rem;
}

.resumen-divider {
    height: 1px;
    background: linear-gradient(90deg, #00D4FF, #7B2FBE);
    margin: 16px 0;
    box-shadow: 0 0 8px rgba(0,212,255,0.3);
}

.resumen-total-label {
    color: #FFFFFF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    font-weight: 700;
}

.resumen-total-value {
    font-family: 'Rajdhani', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #00FF88;
    text-shadow: 0 0 15px rgba(0,255,136,0.35);
}

.resumen-btn-pago {
    width: 100%;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    color: white;
    border: none;
    padding: 18px;
    border-radius: 12px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
    box-shadow: 0 0 20px rgba(0,212,255,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
}

.resumen-btn-pago::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-20deg);
}

.resumen-btn-pago:hover::after {
    animation: shimmer 0.6s ease forwards;
}

.resumen-btn-pago:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(0,212,255,0.5);
}

.resumen-btn-vaciar {
    width: 100%;
    background: transparent;
    color: #FF006E;
    border: 1px solid #FF006E;
    padding: 12px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}

.resumen-btn-vaciar:hover {
    background: #FF006E;
    color: white;
}

/* RESPONSIVE */
@media (max-width: 768px) {
    .carrito-layout {
        grid-template-columns: 1fr;
    }
    .carrito-resumen { position: static; }
    .carrito-item { flex-wrap: wrap; gap: 12px; }
    .carrito-item-controls { width: 100%; justify-content: space-between; }
    .carrito-title { font-size: 1.5rem; }
    .carrito-page { padding: 2rem 1rem; }
}
`;

function Carrito() {
    const { carrito, vaciarCarrito, eliminarDelCarrito, actualizarCantidad } = useContext(CartContext);
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();

    // NUEVO ESTADO PARA EL MENSAJE NEÓN
    const [mensajeCheckout, setMensajeCheckout] = useState('');

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const subtotal = total;
    const envio = total > 0 ? 0 : 0;

    const procesarPago = () => {
        // Validación extra por si acaso
        if (!usuario) {
            navigate('/login');
            return;
        }

        // En vez de alert(), usamos el estado elegante
        setMensajeCheckout('Conectando con la pasarela segura... 💳');

        // Simulamos la compra por ahora (luego conectaremos esto al API)
        setTimeout(() => {
            setMensajeCheckout('¡Orden registrada con éxito en la base de datos! 🎉');
            vaciarCarrito();
        }, 3000);
    };

    return (
        <>
            <style>{carritoStyles}</style>
            <div className="carrito-page">
                <h1 className="carrito-title">🛒 Tu Carrito de Compras</h1>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <span className="carrito-vacio-icon">🛒</span>
                        <h2 className="carrito-vacio-title">Tu carrito está vacío</h2>
                        <p className="carrito-vacio-sub">¿Qué esperas para agregar algo épico?</p>
                        <Link to="/catalogo" className="btn-primary" style={{ marginTop: '8px', padding: '10px 20px', background: '#00D4FF', color: 'black', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                            🎮 Ir a Comprar
                        </Link>
                    </div>
                ) : (
                    <div className="carrito-layout">

                        <div className="carrito-items">
                            {carrito.map((item) => (
                                <div key={item.id} className="carrito-item">
                                    <img
                                        src={item.imagenes && item.imagenes.length > 0
                                            ? item.imagenes[0].url
                                            : 'https://via.placeholder.com/80x80?text=🎮'}
                                        alt={item.nombre}
                                        className="carrito-item-img"
                                    />

                                    <div className="carrito-item-info">
                                        <h3 className="carrito-item-name">{item.nombre}</h3>
                                        <p className="carrito-item-unit">
                                            Precio unitario: <strong style={{ color: '#00FF88' }}>${item.precio?.toFixed(2)}</strong>
                                        </p>
                                    </div>

                                    <div className="carrito-item-controls">
                                        <span style={{ fontSize: '0.8rem', color: '#A0ADB8', fontFamily: 'Inter, sans-serif' }}>Cant:</span>
                                        <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="carrito-qty-btn">-</button>
                                        <span className="carrito-qty-num">{item.cantidad}</span>
                                        <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="carrito-qty-btn">+</button>
                                    </div>

                                    <div className="carrito-item-price">
                                        ${(item.precio * item.cantidad).toFixed(2)}
                                    </div>

                                    <button onClick={() => eliminarDelCarrito(item.id)} className="carrito-remove-btn">
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="carrito-resumen">
                            <h2 className="carrito-resumen-title">Resumen del Pedido</h2>

                            <div className="resumen-row">
                                <span className="resumen-row-label">Subtotal ({carrito.length} producto{carrito.length !== 1 ? 's' : ''})</span>
                                <span className="resumen-row-value">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="resumen-row">
                                <span className="resumen-row-label">Envío</span>
                                <span className="resumen-row-value" style={{ color: '#00FF88' }}>
                                    {envio === 0 ? 'GRATIS 🎉' : `$${envio.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="resumen-row">
                                <span className="resumen-row-label">Descuentos</span>
                                <span className="resumen-row-value">$0.00</span>
                            </div>

                            <div className="resumen-divider"></div>

                            <div className="resumen-row">
                                <span className="resumen-total-label">TOTAL</span>
                                <span className="resumen-total-value">${(total + envio).toFixed(2)}</span>
                            </div>

                            {/* ESTE ES EL MENSAJE NEÓN ELEGANTE (Sale justo arriba del botón cuando compran) */}
                            {mensajeCheckout && (
                                <div style={{
                                    background: 'rgba(0, 212, 255, 0.1)',
                                    border: '1px solid #00D4FF',
                                    color: '#00D4FF',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '15px',
                                    textAlign: 'center',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    animation: 'pulse-neon 2s infinite'
                                }}>
                                    {mensajeCheckout}
                                </div>
                            )}

                            <button
                                onClick={procesarPago}
                                className="resumen-btn-pago"
                            >
                                💳 PROCEDER AL PAGO
                            </button>

                            <button onClick={vaciarCarrito} className="resumen-btn-vaciar">
                                🗑 Vaciar Carrito
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </>
    );
}

export default Carrito;