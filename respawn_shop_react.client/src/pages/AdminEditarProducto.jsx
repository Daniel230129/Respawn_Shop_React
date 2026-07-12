import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const formStyles = `
.edit-page {
    padding: 2rem;
    max-width: 1200px; 
    margin: 0 auto;
    min-height: 80vh;
    color: #FFFFFF;
}

.edit-header {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #3d2613;
    padding-bottom: 1rem;
}

.edit-title-group h1 {
    font-family: 'Orbitron', sans-serif;
    color: #FF9F1C;
    font-size: 2.2rem;
    margin: 0 0 5px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.edit-title-group p {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    margin: 0;
}

/* NUEVA DISTRIBUCIÓN EN 2 PANELES */
.edit-dashboard {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 30px;
    align-items: start;
}

/* Estilo de los paneles */
.edit-panel {
    background: #161211;
    border: 1px solid #4a2e15;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.form-label {
    color: #FF9F1C;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 1px;
}

.form-input, .form-select, .form-textarea {
    background: #1a1514;
    border: 1px solid #4a3320;
    color: #FFFFFF;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}

.form-textarea {
    resize: vertical;
    min-height: 150px;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: #FF9F1C;
    background: #231c1a;
}

/* Panel Izquierdo: Vista Previa Destacada */
.preview-box {
    width: 100%;
    height: 300px;
    border: 2px dashed #4a3320;
    border-radius: 12px;
    background: #1a1514;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 20px;
}

.preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Para que llene el cuadro bonito */
    border-radius: 10px;
}

.preview-placeholder {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    text-align: center;
}

/* Botones separados del formulario */
.action-panel {
    background: #161211;
    border: 1px solid #4a2e15;
    border-radius: 16px;
    padding: 1.5rem;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-submit {
    background: linear-gradient(135deg, #FF9F1C, #E71D36);
    color: white;
    border: none;
    padding: 14px 40px;
    border-radius: 8px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(255, 159, 28, 0.2);
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 159, 28, 0.5);
}

.btn-cancel {
    color: #A0ADB8;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: color 0.3s;
}

.btn-cancel:hover { color: #E71D36; }

.custom-toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    border-radius: 12px;
    background: #161211;
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    border: 1px solid #4a2e15;
    z-index: 9999;
    transform: translateY(150%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: flex;
    align-items: center;
    gap: 12px;
}
.custom-toast.show { transform: translateY(0); opacity: 1; }

@media (max-width: 950px) {
    .edit-dashboard { grid-template-columns: 1fr; }
    .action-panel { flex-direction: column; gap: 20px; }
    .btn-submit { width: 100%; }
}
`;

function AdminEditarProducto() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [categorias, setCategorias] = useState([]);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [esDigital, setEsDigital] = useState(false);
    const [categoriaId, setCategoriaId] = useState('');
    const [genero, setGenero] = useState('');
    const [requisitosSistema, setRequisitosSistema] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');

    const [cargandoProducto, setCargandoProducto] = useState(true);
    const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: '' });

    const mostrarAlerta = (mensaje, tipo = 'info') => {
        setToast({ visible: true, mensaje, tipo });
        setTimeout(() => setToast({ visible: false, mensaje: '', tipo: '' }), 4000);
    };

    useEffect(() => {
        const fetchDatosIniciales = async () => {
            try {
                const resCat = await fetch('https://localhost:7284/api/Categorias');
                if (resCat.ok) {
                    const dataCat = await resCat.json();
                    setCategorias(dataCat);
                }

                const resProd = await fetch(`https://localhost:7284/api/Productos/${id}`);
                if (resProd.ok) {
                    const prod = await resProd.json();
                    setNombre(prod.nombre || '');
                    setDescripcion(prod.descripcion || '');
                    setPrecio(prod.precio || 0);
                    setStock(prod.stock || 0);
                    setEsDigital(prod.esDigital || false);
                    setCategoriaId(prod.categoriaId || '');
                    setGenero(prod.genero || '');
                    setRequisitosSistema(prod.requisitosSistema || '');

                    if (prod.imagenes && prod.imagenes.length > 0) {
                        setImagenUrl(prod.imagenes[0].url || '');
                    }
                } else {
                    mostrarAlerta('No se pudo encontrar el producto.', 'error');
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                mostrarAlerta('Error de conexión con el servidor.', 'error');
            } finally {
                setCargandoProducto(false);
            }
        };

        fetchDatosIniciales();
    }, [id]);

    const manejarSubmit = async (e) => {
        e.preventDefault();

        const productoActualizado = {
            id: parseInt(id),
            nombre: nombre,
            descripcion: descripcion,
            precio: parseFloat(precio) || 0,
            stock: parseInt(stock) || 0,
            esDigital: esDigital,
            categoriaId: parseInt(categoriaId),
            genero: genero || null,
            requisitosSistema: requisitosSistema || null,
            imagenes: imagenUrl ? [{ url: imagenUrl }] : []
        };

        try {
            const response = await fetch(`https://localhost:7284/api/Productos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActualizado)
            });

            if (response.ok) {
                mostrarAlerta('💾 ¡Producto actualizado en la base de datos!', 'success');
                setTimeout(() => navigate('/admin/inventario'), 1500);
            } else {
                mostrarAlerta('Error al actualizar. Revisa la consola.', 'error');
            }
        } catch (error) {
            console.error("Error:", error);
            mostrarAlerta('Error de conexión con el servidor.', 'error');
        }
    };

    if (cargandoProducto) {
        return <div style={{ color: '#FF9F1C', textAlign: 'center', marginTop: '100px', fontFamily: 'Orbitron' }}><h2>Sincronizando datos... ⏳</h2></div>;
    }

    return (
        <>
            <style>{formStyles}</style>

            <div className={`custom-toast toast-${toast.tipo} ${toast.visible ? 'show' : ''}`}>
                <span style={{ fontSize: '1.2rem' }}>
                    {toast.tipo === 'success' ? '✅' : toast.tipo === 'error' ? '❌' : '⚙️'}
                </span>
                {toast.mensaje}
            </div>

            <div className="edit-page">
                <div className="edit-header">
                    <div className="edit-title-group">
                        <h1>⚙️ Consola de Edición</h1>
                        <p>Actualizando registros del producto <strong>#{id}</strong></p>
                    </div>
                </div>

                <form onSubmit={manejarSubmit}>
                    <div className="edit-dashboard">

                        {/* PANEL IZQUIERDO: MULTIMEDIA Y FINANZAS */}
                        <div className="edit-panel">
                            <div className="preview-box">
                                {imagenUrl ? (
                                    <img src={imagenUrl} alt="Vista previa" className="preview-img" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="preview-placeholder">❌ Enlace roto</span>'; }} />
                                ) : (
                                    <div className="preview-placeholder"><span style={{ fontSize: '3rem' }}>🖼️</span><p>Sin Portada</p></div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">URL DE LA PORTADA</label>
                                <input type="url" className="form-input" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} placeholder="https://..." />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">PRECIO ($)</label>
                                    <input type="number" step="0.01" min="0" className="form-input" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">STOCK</label>
                                    <input type="number" min="0" className="form-input" value={stock} onChange={(e) => setStock(e.target.value)} required />
                                </div>
                            </div>
                        </div>

                        {/* PANEL DERECHO: TEXTOS Y CLASIFICACIÓN */}
                        <div className="edit-panel">
                            <div className="form-group">
                                <label className="form-label">NOMBRE DEL PRODUCTO</label>
                                <input type="text" className="form-input" style={{ fontSize: '1.2rem', fontWeight: 'bold' }} value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">CATEGORÍA</label>
                                    <select className="form-select" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                                        <option value="" disabled>Seleccionar...</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">TIPO</label>
                                    <select className="form-select" value={esDigital} onChange={(e) => setEsDigital(e.target.value === 'true')}>
                                        <option value="false">Físico / Accesorio</option>
                                        <option value="true">Digital (Descarga)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">GÉNERO</label>
                                    <input type="text" className="form-input" value={genero} onChange={(e) => setGenero(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">DESCRIPCIÓN DETALLADA</label>
                                <textarea className="form-textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">REQUISITOS DEL SISTEMA (PC)</label>
                                <textarea className="form-textarea" style={{ minHeight: '80px' }} value={requisitosSistema} onChange={(e) => setRequisitosSistema(e.target.value)}></textarea>
                            </div>
                        </div>

                    </div>

                    {/* PANEL INFERIOR: BOTONES */}
                    <div className="action-panel">
                        <Link to="/admin/inventario" className="btn-cancel">⬅ Volver al Inventario (Descartar)</Link>
                        <button type="submit" className="btn-submit">💾 APLICAR CAMBIOS</button>
                    </div>
                </form>

            </div>
        </>
    );
}

export default AdminEditarProducto;