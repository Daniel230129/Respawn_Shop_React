import { useState, useEffect } from 'react';

const styles = `
.admin-pedidos-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem 5rem;
    min-height: 70vh;
}

.admin-pedidos-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #FF006E, #7B2FBE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    filter: drop-shadow(0 0 10px rgba(255,0,110,0.25));
}

.admin-pedidos-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.admin-stat-card {
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 12px;
    padding: 16px 24px;
    flex: 1;
    min-width: 120px;
    text-align: center;
}

.admin-stat-num {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 900;
    color: #00D4FF;
}

.admin-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #A0ADB8;
    margin-top: 4px;
}

.ap-tabla {
    width: 100%;
    border-collapse: collapse;
}

.ap-tabla th {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: #00D4FF;
    letter-spacing: 1px;
    text-align: left;
    padding: 14px 16px;
    background: #0a0a1a;
    border-bottom: 2px solid #1e1e3f;
}

.ap-tabla td {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #FFFFFF;
    padding: 14px 16px;
    border-bottom: 1px solid #1e1e3f;
    vertical-align: middle;
}

.ap-tabla tr:hover td {
    background: rgba(0,212,255,0.04);
}

.ap-estado-select {
    background: #0a0a1a;
    border: 1px solid #1e1e3f;
    color: #FFFFFF;
    padding: 6px 12px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
}

.ap-estado-select:hover, .ap-estado-select:focus {
    border-color: #00D4FF;
}

.ap-productos-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.ap-producto-item {
    font-size: 0.82rem;
    color: #A0ADB8;
    display: flex;
    align-items: center;
    gap: 6px;
}

.ap-producto-img {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    object-fit: cover;
    background: #1e1e3f;
    flex-shrink: 0;
}

.ap-badge {
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
}

.ap-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 5rem;
    color: #A0ADB8;
    font-family: 'Orbitron', sans-serif;
}

.ap-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #1e1e3f;
    border-top: 3px solid #FF006E;
    border-right: 3px solid #7B2FBE;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

.ap-guardando {
    font-size: 0.75rem;
    color: #00D4FF;
    margin-left: 8px;
    animation: pulse 1s ease-in-out infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.ap-filtro-bar {
    display: flex;
    gap: 12px;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
}

.ap-filtro-chip {
    padding: 7px 16px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #1e1e3f;
    background: transparent;
    color: #A0ADB8;
}

.ap-filtro-chip.active {
    background: linear-gradient(135deg, #FF006E, #7B2FBE);
    border-color: transparent;
    color: #FFFFFF;
}
`;

const ESTADOS = ['Pendiente', 'En proceso', 'Enviado', 'Completado', 'Cancelado'];
const ESTADO_COLORS = {
    'Pendiente': '#FFBE00',
    'En proceso': '#00D4FF',
    'Enviado': '#B07EFF',
    'Completado': '#00FF88',
    'Cancelado': '#FF006E',
};

function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState({});
    const [filtroEstado, setFiltroEstado] = useState('Todos');

    useEffect(() => {
        const cargarTodos = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('https://localhost:7284/api/Pedidos', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setPedidos(data.sort((a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido)));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setCargando(false);
            }
        };
        cargarTodos();
    }, []);

    const cambiarEstado = async (pedidoId, nuevoEstado) => {
        setGuardando(prev => ({ ...prev, [pedidoId]: true }));
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`https://localhost:7284/api/Pedidos/${pedidoId}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            if (res.ok) {
                setPedidos(prev => prev.map(p =>
                    p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
                ));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setGuardando(prev => ({ ...prev, [pedidoId]: false }));
        }
    };

    const pedidosFiltrados = filtroEstado === 'Todos'
        ? pedidos
        : pedidos.filter(p => p.estado === filtroEstado);

    const stats = ESTADOS.map(e => ({ estado: e, count: pedidos.filter(p => p.estado === e).length }));

    if (cargando) return (
        <>
            <style>{styles}</style>
            <div className="ap-loading">
                <div className="ap-spinner"></div>
                <span>Cargando pedidos...</span>
            </div>
        </>
    );

    const imagenAdminDefecto = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%231e1e3f'/%3E%3Ctext x='50%25' y='50%25' font-size='45' text-anchor='middle' dy='.3em'%3E%F0%9F%8E%AE%3C/text%3E%3C/svg%3E";

    return (
        <>
            <style>{styles}</style>
            <div className="admin-pedidos-page">
                <h1 className="admin-pedidos-title">📋 Gestión de Pedidos</h1>
                <p style={{ color: '#A0ADB8', fontFamily: 'Inter, sans-serif', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''} en total — Cambia el estado de cualquier pedido directamente desde aquí.
                </p>

                <div className="admin-pedidos-stats">
                    <div className="admin-stat-card">
                        <div className="admin-stat-num" style={{ color: '#FFFFFF' }}>{pedidos.length}</div>
                        <div className="admin-stat-label">TOTAL</div>
                    </div>
                    {stats.map(s => (
                        <div key={s.estado} className="admin-stat-card">
                            <div className="admin-stat-num" style={{ color: ESTADO_COLORS[s.estado] }}>{s.count}</div>
                            <div className="admin-stat-label">{s.estado.toUpperCase()}</div>
                        </div>
                    ))}
                </div>

                <div className="ap-filtro-bar">
                    <button
                        className={`ap-filtro-chip${filtroEstado === 'Todos' ? ' active' : ''}`}
                        onClick={() => setFiltroEstado('Todos')}
                    >
                        Todos ({pedidos.length})
                    </button>
                    {ESTADOS.map(e => (
                        <button
                            key={e}
                            className={`ap-filtro-chip${filtroEstado === e ? ' active' : ''}`}
                            onClick={() => setFiltroEstado(e)}
                            style={filtroEstado === e ? {} : { color: ESTADO_COLORS[e], borderColor: ESTADO_COLORS[e] + '44' }}
                        >
                            {e} ({pedidos.filter(p => p.estado === e).length})
                        </button>
                    ))}
                </div>

                <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #1e1e3f' }}>
                    <table className="ap-tabla">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CLIENTE</th>
                                <th>FECHA</th>
                                <th>PRODUCTOS</th>
                                <th>TOTAL</th>
                                <th>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosFiltrados.map(pedido => (
                                <tr key={pedido.id}>
                                    <td style={{ color: '#A0ADB8', fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem' }}>
                                        #{String(pedido.id).padStart(5, '0')}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>
                                            {pedido.usuario?.nombre} {pedido.usuario?.apellido}
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: '#A0ADB8' }}>
                                            {pedido.usuario?.correo}
                                        </div>
                                    </td>
                                    <td style={{ color: '#A0ADB8', fontSize: '0.83rem' }}>
                                        {new Date(pedido.fechaPedido).toLocaleDateString('es-MX', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                        <br />
                                        {new Date(pedido.fechaPedido).toLocaleTimeString('es-MX', {
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </td>
                                    <td>
                                        <div className="ap-productos-list">
                                            {pedido.detalles?.slice(0, 2).map(det => (
                                                <div key={det.id} className="ap-producto-item">
                                                    <img
                                                        src={det.producto?.imagenes?.[0]?.url || imagenAdminDefecto}
                                                        alt=""
                                                        className="ap-producto-img"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = imagenAdminDefecto;
                                                        }}
                                                    />
                                                    <span>{det.producto?.nombre}</span>
                                                    <span style={{ color: '#A0ADB8' }}>×{det.cantidad}</span>
                                                </div>
                                            ))}
                                            {pedido.detalles?.length > 2 && (
                                                <span style={{ fontSize: '0.78rem', color: '#A0ADB8' }}>
                                                    +{pedido.detalles.length - 2} más...
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', color: '#00FF88', fontWeight: 700 }}>
                                            ${pedido.totalPagado?.toFixed(2)}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <select
                                                className="ap-estado-select"
                                                value={pedido.estado}
                                                onChange={e => cambiarEstado(pedido.id, e.target.value)}
                                                style={{ borderColor: ESTADO_COLORS[pedido.estado] + '66', color: ESTADO_COLORS[pedido.estado] }}
                                            >
                                                {ESTADOS.map(e => (
                                                    <option key={e} value={e}>{e}</option>
                                                ))}
                                            </select>
                                            {guardando[pedido.id] && (
                                                <span className="ap-guardando">Guardando...</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pedidosFiltrados.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#A0ADB8', fontFamily: 'Inter, sans-serif' }}>
                            No hay pedidos con estado "{filtroEstado}"
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminPedidos;
