import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const adminStyles = `
.admin-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 80vh;
    color: #FFFFFF;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.admin-title {
    font-family: 'Orbitron', sans-serif;
    color: #00D4FF;
    font-size: 2rem;
    margin: 0;
}

.btn-add {
    background: linear-gradient(135deg, #00FF88, #00A355);
    color: #060612;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
}

/* Controles: Buscador y Selector */
.admin-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111128;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid #1e1e3f;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.admin-search {
    background: #0a0a1a;
    border: 1px solid #00D4FF;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    width: 300px;
    font-family: 'Inter', sans-serif;
    outline: none;
}

.admin-select {
    background: #0a0a1a;
    border: 1px solid #30363d;
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    outline: none;
}

/* Tabla */
.admin-table-container {
    overflow-x: auto;
    background: #111128;
    border-radius: 12px;
    border: 1px solid #1e1e3f;
}

.admin-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Inter', sans-serif;
}

.admin-table th {
    background: #0a0a1a;
    color: #00D4FF;
    padding: 15px;
    text-align: left;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    border-bottom: 2px solid #1e1e3f;
}

.admin-table td {
    padding: 15px;
    border-bottom: 1px solid #1e1e3f;
    color: #A0ADB8;
    vertical-align: middle;
}

.admin-table tr:hover {
    background: rgba(0, 212, 255, 0.05);
}

.table-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #30363d;
}

/* Botones de acción */
.action-btns {
    display: flex;
    gap: 10px;
}

.btn-edit {
    background: transparent;
    color: #00D4FF;
    border: 1px solid #00D4FF;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-edit:hover { background: #00D4FF; color: black; }

.btn-delete {
    background: transparent;
    color: #FF006E;
    border: 1px solid #FF006E;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-delete:hover { background: #FF006E; color: white; }

/* Paginación */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 2rem;
}

.page-btn {
    background: #111128;
    border: 1px solid #30363d;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
    border-color: #00D4FF;
    color: #00D4FF;
}

.page-btn.active {
    background: #00D4FF;
    color: black;
    border-color: #00D4FF;
    font-weight: bold;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
`;

function AdminInventario() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Estados para los filtros y paginación
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [itemsPorPagina, setItemsPorPagina] = useState(5); // Por defecto 5

    useEffect(() => {
        // La función asíncrona vive ADENTRO del useEffect
        const cargarProductos = async () => {
            try {
                const res = await fetch('https://localhost:7284/api/Productos');
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error("Error cargando inventario:", error);
            } finally {
                setCargando(false);
            }
        };

        // Y la llamamos aquí mismo
        cargarProductos();
    }, []);

    const eliminarProducto = async (id, nombre) => {
        const confirmar = window.confirm(`⚠️ ¿Estás seguro que deseas eliminar "${nombre}"? Esta acción no se puede deshacer.`);
        if (confirmar) {
            try {
                // Aquí llamamos a tu API para borrar (necesitas tener el endpoint DELETE configurado en .NET)
                const res = await fetch(`https://localhost:7284/api/Productos/${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    // Si se borró en la base de datos, lo quitamos de la pantalla
                    setProductos(productos.filter(p => p.id !== id));
                    alert('✅ Producto eliminado con éxito.');
                } else {
                    alert('❌ Hubo un error al eliminar el producto.');
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    // --- LÓGICA DE FILTRADO Y PAGINACIÓN ---

    // 1. Primero filtramos por la barra de búsqueda
    const productosFiltrados = productos.filter(p =>
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    // 2. Calculamos los índices para la paginación matemática
    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;

    // 3. Cortamos el arreglo para mostrar solo los de la página actual
    const productosPaginados = productosFiltrados.slice(indicePrimerItem, indiceUltimoItem);

    // 4. Calculamos cuántas páginas hay en total
    const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina);

    // Función para cambiar de página
    const cambiarPagina = (numero) => setPaginaActual(numero);

    // Si el usuario escribe en el buscador, lo devolvemos a la página 1
    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
        setPaginaActual(1);
    };

    // Si el usuario cambia la cantidad de items, lo devolvemos a la página 1
    const manejarItemsPorPagina = (e) => {
        setItemsPorPagina(Number(e.target.value));
        setPaginaActual(1);
    };

    return (
        <>
            <style>{adminStyles}</style>
            <div className="admin-page">

                <div className="admin-header">
                    <h1 className="admin-title">📦 Gestión de Inventario</h1>
                    <Link to="/admin/agregar-producto" className="btn-add">
                        ➕ Agregar Producto
                    </Link>
                </div>

                <div className="admin-controls">
                    <input
                        type="text"
                        placeholder="🔍 Buscar juego por nombre..."
                        className="admin-search"
                        value={busqueda}
                        onChange={manejarBusqueda}
                    />

                    <div>
                        <label style={{ marginRight: '10px', color: '#A0ADB8' }}>Mostrar:</label>
                        <select className="admin-select" value={itemsPorPagina} onChange={manejarItemsPorPagina}>
                            <option value={5}>5 resultados</option>
                            <option value={10}>10 resultados</option>
                            <option value={20}>20 resultados</option>
                            <option value={50}>50 resultados</option>
                        </select>
                    </div>
                </div>

                {cargando ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#00D4FF' }}>Cargando inventario... ⏳</div>
                ) : (
                    <>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosPaginados.length > 0 ? (
                                        productosPaginados.map(producto => (
                                            <tr key={producto.id}>
                                                <td>
                                                    <img
                                                        src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : 'https://via.placeholder.com/50'}
                                                        alt="img"
                                                        className="table-img"
                                                    />
                                                </td>
                                                <td style={{ color: 'white', fontWeight: 'bold' }}>{producto.nombre}</td>
                                                <td>{producto.categoria?.nombre || 'N/A'}</td>
                                                <td style={{ color: '#00FF88' }}>${producto.precio?.toFixed(2)}</td>
                                                <td>
                                                    <span style={{
                                                        color: producto.stock < 5 ? '#FF006E' : '#A0ADB8',
                                                        fontWeight: producto.stock < 5 ? 'bold' : 'normal'
                                                    }}>
                                                        {producto.stock} uds.
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-btns">
                                                        {/* Este botón nos llevará a la página de editar (la haremos luego) */}
                                                        <Link to={`/admin/editar-producto/${producto.id}`} className="btn-edit">
                                                            ✏️ Editar
                                                        </Link>
                                                        <button onClick={() => eliminarProducto(producto.id, producto.nombre)} className="btn-delete">
                                                            🗑️ Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                                No se encontraron productos con "{busqueda}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Controles de Paginación */}
                        {totalPaginas > 1 && (
                            <div className="pagination">
                                <button
                                    className="page-btn"
                                    disabled={paginaActual === 1}
                                    onClick={() => cambiarPagina(paginaActual - 1)}
                                >
                                    &laquo; Anterior
                                </button>

                                {/* Generamos los numeritos de las páginas dinámicamente */}
                                {[...Array(totalPaginas)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`page-btn ${paginaActual === index + 1 ? 'active' : ''}`}
                                        onClick={() => cambiarPagina(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    className="page-btn"
                                    disabled={paginaActual === totalPaginas}
                                    onClick={() => cambiarPagina(paginaActual + 1)}
                                >
                                    Siguiente &raquo;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default AdminInventario;