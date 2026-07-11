import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const styles = `
.pedidos-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 2rem 5rem;
    min-height: 70vh;
}

.pedidos-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    filter: drop-shadow(0 0 10px rgba(0,212,255,0.25));
}

.pedidos-subtitle {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
}

.pedido-card {
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.pedido-card:hover {
    border-color: rgba(0,212,255,0.3);
    box-shadow: 0 4px 20px rgba(0,212,255,0.07);
}

.pedido-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
}

.pedido-id {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    color: #A0ADB8;
    letter-spacing: 1px;
}

.pedido-fecha {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #A0ADB8;
}

.pedido-estado {
    padding: 5px 14px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.estado-pendiente { background: rgba(255,190,0,0.15); color: #FFBE00; border: 1px solid #FFBE00; }
.estado-en_proceso { background: rgba(0,212,255,0.15); color: #00D4FF; border: 1px solid #00D4FF; }
.estado-enviado { background: rgba(123,47,190,0.15); color: #B07EFF; border: 1px solid #7B2FBE; }
.estado-completado { background: rgba(0,255,136,0.15); color: #00FF88; border: 1px solid #00FF88; }
.estado-cancelado { background: rgba(255,0,110,0.15); color: #FF006E; border: 1px solid #FF006E; }

.pedido-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid #1e1e3f;
    padding-top: 16px;
}

.pedido-item {
    display: flex;
    align-items: center;
    gap: 14px;
}

.pedido-item-img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 8px;
    background: #0a0a1a;
    flex-shrink: 0;
}

.pedido-item-info {
    flex: 1;
}

.pedido-item-nombre {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    color: #FFFFFF;
    font-size: 0.95rem;
}

.pedido-item-detalle {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #A0ADB8;
    margin-top: 2px;
}

.pedido-item-precio {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #00FF88;
    flex-shrink: 0;
}

.pedido-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #1e1e3f;
}

.pedido-total-label {
    font-family: 'Inter', sans-serif;
    color: #A0ADB8;
    font-size: 0.9rem;
}

.pedido-total-valor {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #00FF88;
    text-shadow: 0 0 12px rgba(0,255,136,0.3);
}

.pedidos-vacio {
    text-align: center;
    padding: 5rem 2rem;
}

.pedidos-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 5rem;
    color: #A0ADB8;
    font-family: 'Orbitron', sans-serif;
}

.pedidos-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #1e1e3f;
    border-top: 3px solid #00D4FF;
    border-right: 3px solid #7B2FBE;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.codigo-digital {
    background: rgba(123,47,190,0.15);
    border: 1px solid #7B2FBE;
    border-radius: 8px;
    padding: 6px 12px;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    color: #B07EFF;
    letter-spacing: 2px;
    margin-top: 4px;
    display: inline-block;
}
`;

const estadoClass = (estado) => {
    const map = {
        'Pendiente': 'estado-pendiente',
        'En proceso': 'estado-en_proceso',
        'Enviado': 'estado-enviado',
        'Completado': 'estado-completado',
        'Cancelado': 'estado-cancelado',
    };
    return map[estado] || 'estado-pendiente';
};

function MisPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        const cargarPedidos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const payload = JSON.parse(atob(token.split('.')[1]));
                const usuarioId = parseInt(
                    payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
                    || payload.nameid
                    || payload.sub
                    || '0'
                );

                const res = await fetch(`https://localhost:7284/api/Pedidos/usuario/${usuarioId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setPedidos(data);
                }
            } catch (err) {
                console.error('Error cargando pedidos:', err);
            } finally {
                setCargando(false);
            }
        };

        cargarPedidos();
    }, []);

    if (cargando) return (
        <>
            <style>{styles}</style>
            <div className="pedidos-loading">
                <div className="pedidos-spinner"></div>
                <span>Cargando tus pedidos...</span>
            </div>
        </>
    );

    return (
        <>
            <style>{styles}</style>
            <div className="pedidos-page">
                <h1 className="pedidos-title">📦 Mis Pedidos</h1>
                <p className="pedidos-subtitle">
                    Hola {usuario?.nombre || 'Gamer'} — aquí está el historial de todas tus compras.
                </p>

                {pedidos.length === 0 ? (
                    <div className="pedidos-vacio">
                        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</p>
                        <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                            Aún no tienes pedidos
                        </h2>
                        <p style={{ color: '#A0ADB8', fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem' }}>
                            ¡Explora el catálogo y haz tu primera compra!
                        </p>
                        <Link to="/catalogo" className="btn-primary">🎮 Ir al Catálogo</Link>
                    </div>
                ) : (
                    pedidos.map(pedido => (
                        <div key={pedido.id} className="pedido-card">
                            <div className="pedido-header">
                                <div>
                                    <div className="pedido-id">PEDIDO #{String(pedido.id).padStart(5, '0')}</div>
                                    <div className="pedido-fecha">
                                        {new Date(pedido.fechaPedido).toLocaleDateString('es-MX', {
                                            year: 'numeric', month: 'long', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <span className={`pedido-estado ${estadoClass(pedido.estado)}`}>
                                    {pedido.estado}
                                </span>
                            </div>

                            <div className="pedido-items">
                                {pedido.detalles?.map(det => (
                                    <div key={det.id} className="pedido-item">
                                        <img
                                            src={det.producto?.imagenes?.[0]?.url
                                                || 'https://via.placeholder.com/56x56?text=🎮'}
                                            alt={det.producto?.nombre}
                                            className="pedido-item-img"
                                        />
                                        <div className="pedido-item-info">
                                            <div className="pedido-item-nombre">
                                                {det.producto?.nombre || 'Producto'}
                                                {det.producto?.esDigital && (
                                                    <span style={{ marginLeft: '8px', fontSize: '0.7rem', color: '#B07EFF', background: 'rgba(123,47,190,0.15)', padding: '2px 8px', borderRadius: '50px' }}>
                                                        💿 DIGITAL
                                                    </span>
                                                )}
                                            </div>
                                            <div className="pedido-item-detalle">
                                                {det.cantidad} × ${det.precioUnitario?.toFixed(2)}
                                            </div>
                                            {det.codigoDigitalGenerado && (
                                                <div className="codigo-digital">
                                                    🔑 {det.codigoDigitalGenerado}
                                                </div>
                                            )}
                                        </div>
                                        <div className="pedido-item-precio">
                                            ${(det.cantidad * det.precioUnitario).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pedido-footer">
                                <span className="pedido-total-label">
                                    {pedido.detalles?.length || 0} producto{pedido.detalles?.length !== 1 ? 's' : ''}
                                </span>
                                <div>
                                    <span className="pedido-total-label" style={{ marginRight: '8px' }}>TOTAL:</span>
                                    <span className="pedido-total-valor">${pedido.totalPagado?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default MisPedidos;
