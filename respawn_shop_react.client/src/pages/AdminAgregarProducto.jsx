import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const formStyles = `
.add-page {
    padding: 3rem 2rem;
    max-width: 1100px; 
    margin: 0 auto;
    min-height: 80vh;
    color: #FFFFFF;
    position: relative;
}

.add-header {
    margin-bottom: 2rem;
}

.add-title {
    font-family: 'Orbitron', sans-serif;
    color: #00D4FF;
    font-size: 2.2rem;
    margin-bottom: 10px;
}

.add-subtitle {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
}

.add-card {
    background: #111128;
    border: 1px solid #1e1e3f;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 0 30px rgba(0,212,255,0.08);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.col-4 { grid-column: span 4; }
.col-2 { grid-column: span 2; }
.col-1 { grid-column: span 1; }

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    color: #00D4FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 1px;
}

.form-input, .form-select, .form-textarea {
    background: #0a0a1a;
    border: 1px solid #30363d;
    color: #FFFFFF;
    padding: 14px 16px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}

.form-textarea {
    resize: vertical;
    min-height: 120px;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: #7B2FBE;
    box-shadow: 0 0 15px rgba(123, 47, 190, 0.3);
}

/* GRUPO DE BUSQUEDA IA EN LA CABECERA */
.ia-input-group {
    display: flex;
    gap: 12px;
    align-items: stretch;
}

.btn-ia {
    background: linear-gradient(90deg, #FF006E, #7B2FBE);
    color: white;
    border: none;
    padding: 0 24px;
    border-radius: 10px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
    box-shadow: 0 0 15px rgba(255, 0, 110, 0.3);
    white-space: nowrap;
}

.btn-ia:hover:not(:disabled) {
    box-shadow: 0 0 25px rgba(255, 0, 110, 0.6);
    transform: translateY(-2px);
}

.btn-ia:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.preview-box {
    margin-top: 15px;
    width: 100%;
    height: 100%;
    min-height: 220px;
    border: 2px dashed #30363d;
    border-radius: 12px;
    background: #0a0a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: border-color 0.3s;
}

.preview-box:hover {
    border-color: #00D4FF;
}

.preview-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
}

.preview-placeholder {
    color: #A0ADB8;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    text-align: center;
}

.form-actions {
    margin-top: 3rem;
    border-top: 1px solid #1e1e3f;
    padding-top: 2rem;
}

.btn-submit {
    width: 100%;
    background: linear-gradient(135deg, #00D4FF, #7B2FBE);
    color: white;
    border: none;
    padding: 16px;
    border-radius: 10px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0,212,255,0.2);
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0,212,255,0.4);
}

.btn-cancel {
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #FF006E;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: color 0.3s;
}

.btn-cancel:hover { color: white; }

.custom-toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    border-radius: 12px;
    background: #111128;
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 9999;
    transform: translateY(150%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: flex;
    align-items: center;
    gap: 12px;
}

.custom-toast.show { transform: translateY(0); opacity: 1; }
.toast-success { border-left: 4px solid #00FF88; }
.toast-error { border-left: 4px solid #FF006E; }
.toast-info { border-left: 4px solid #00D4FF; }

@media (max-width: 900px) {
    .col-4, .col-2, .col-1 { grid-column: span 4; }
    .ia-input-group { flex-direction: column; }
    .btn-ia { padding: 14px; }
}
`;

function AdminAgregarProducto() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    // Todos los campos
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [esDigital, setEsDigital] = useState(false);
    const [categoriaId, setCategoriaId] = useState('');
    const [genero, setGenero] = useState('');
    const [requisitosSistema, setRequisitosSistema] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');

    const [cargandoIA, setCargandoIA] = useState(false);
    const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: '' });

    const mostrarAlerta = (mensaje, tipo = 'info') => {
        setToast({ visible: true, mensaje, tipo });
        setTimeout(() => setToast({ visible: false, mensaje: '', tipo: '' }), 4000);
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch('https://localhost:7284/api/Categorias');
                if (res.ok) {
                    const data = await res.json();
                    setCategorias(data);
                    if (data.length > 0) setCategoriaId(data[0].id);
                }
            } catch (error) {
                console.error("Error cargando categorías", error);
            }
        };
        fetchCategorias();
    }, []);

    const generarConIA = async () => {
        if (!nombre) {
            mostrarAlerta('Primero escribe el nombre del producto en la barra.', 'error');
            return;
        }

        setCargandoIA(true);
        mostrarAlerta('Buscando datos en RAWG y OpenAI...', 'info');

        try {
            const response = await fetch(`https://localhost:7284/api/Ia/autocompletar/${encodeURIComponent(nombre)}`);

            if (response.ok) {
                const data = await response.text();
                try {
                    const json = JSON.parse(data);

                    // Llenamos TODO lo que la IA haya traído
                    if (json.descripcion) setDescripcion(json.descripcion);
                    if (json.precio) setPrecio(json.precio);
                    if (json.stock) setStock(json.stock);
                    if (json.generos || json.genero) setGenero(json.generos || json.genero);
                    if (json.requisitos || json.requisitosSistema) setRequisitosSistema(json.requisitos || json.requisitosSistema);
                    if (json.imagenUrl || json.foto || json.imagen) setImagenUrl(json.imagenUrl || json.foto || json.imagen);

                    // Asignar si es físico o digital
                    if (json.esDigital !== undefined) {
                        setEsDigital(json.esDigital);
                    } else if (json.tipo) {
                        setEsDigital(String(json.tipo).toLowerCase().includes('digital'));
                    }

                    // Intentar asginar la categoría automáticamente si la IA la devolvió
                    if (json.categoria || json.categoriaId) {
                        const categoriaAI = String(json.categoria || json.categoriaId).toLowerCase();
                        const categoriaCoincidente = categorias.find(c =>
                            c.nombre.toLowerCase().includes(categoriaAI) || String(c.id) === categoriaAI
                        );
                        if (categoriaCoincidente) setCategoriaId(categoriaCoincidente.id);
                    }

                    mostrarAlerta('✨ ¡Formulario autocompletado con éxito!', 'success');
                } catch {
                    // Por si acaso la IA solo devuelve texto plano
                    setDescripcion(data);
                    mostrarAlerta('✨ ¡Descripción generada con éxito!', 'success');
                }
            } else {
                mostrarAlerta(`Error del servidor al intentar autocompletar.`, 'error');
            }
        } catch (error) {
            console.error("Error de red con la IA:", error);
            mostrarAlerta('Error de red. ¿El backend está encendido?', 'error');
        } finally {
            setCargandoIA(false);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();

        const nuevoProducto = {
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
            const response = await fetch('https://localhost:7284/api/Productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });

            if (response.ok) {
                mostrarAlerta('🎮 ¡Producto guardado exitosamente!', 'success');
                setTimeout(() => navigate('/admin/inventario'), 1500);
            } else {
                mostrarAlerta('Error al guardar. Revisa los datos.', 'error');
            }
        } catch (error) {
            console.error("Error:", error);
            mostrarAlerta('Error de conexión con el servidor.', 'error');
        }
    };

    return (
        <>
            <style>{formStyles}</style>

            <div className={`custom-toast toast-${toast.tipo} ${toast.visible ? 'show' : ''}`}>
                <span style={{ fontSize: '1.2rem' }}>
                    {toast.tipo === 'success' ? '✅' : toast.tipo === 'error' ? '❌' : '💡'}
                </span>
                {toast.mensaje}
            </div>

            <div className="add-page">
                <div className="add-header">
                    <h1 className="add-title">➕ Nuevo Producto</h1>
                    <p className="add-subtitle">Completa el formulario para registrar un juego o accesorio.</p>
                </div>

                <div className="add-card">
                    <form onSubmit={manejarSubmit}>
                        <div className="form-grid">

                            {/* FILA 1: Nombre (La estrella del show) + Botón IA */}
                            <div className="form-group col-4">
                                <label className="form-label">1. ESCRIBE EL NOMBRE Y DEJA QUE LA IA HAGA EL RESTO</label>
                                <div className="ia-input-group">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Ej: The Witcher 3, Cyberpunk 2077..."
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        className="btn-ia"
                                        onClick={generarConIA}
                                        disabled={cargandoIA}
                                    >
                                        {cargandoIA ? '⏳ Cargando datos...' : '✨ Autocompletar con IA'}
                                    </button>
                                </div>
                            </div>

                            {/* FILA 2: Clasificación */}
                            <div className="form-group col-2">
                                <label className="form-label">GÉNERO</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Ej: RPG, Acción, Aventura..."
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                />
                            </div>

                            <div className="form-group col-1">
                                <label className="form-label">CATEGORÍA</label>
                                <select
                                    className="form-select"
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                    required
                                >
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group col-1">
                                <label className="form-label">TIPO</label>
                                <select
                                    className="form-select"
                                    value={esDigital}
                                    onChange={(e) => setEsDigital(e.target.value === 'true')}
                                >
                                    <option value="false">Físico / Accesorio</option>
                                    <option value="true">Digital (Descarga)</option>
                                </select>
                            </div>

                            {/* FILA 3: Finanzas */}
                            <div className="form-group col-2">
                                <label className="form-label">PRECIO ($)</label>
                                <input
                                    type="number" step="0.01" min="0"
                                    className="form-input"
                                    placeholder="0.00"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group col-2">
                                <label className="form-label">CANTIDAD EN STOCK</label>
                                <input
                                    type="number" min="0"
                                    className="form-input"
                                    placeholder="0"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </div>

                            {/* FILA 4: Descripción */}
                            <div className="form-group col-4">
                                <label className="form-label">DESCRIPCIÓN DETALLADA</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="La IA pondrá la reseña aquí..."
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            {/* FILA 5: Requisitos y Multimedia */}
                            <div className="form-group col-2">
                                <label className="form-label">REQUISITOS DEL SISTEMA (Si aplica)</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Especificaciones mínimas y recomendadas..."
                                    style={{ height: '100%' }}
                                    value={requisitosSistema}
                                    onChange={(e) => setRequisitosSistema(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group col-2">
                                <label className="form-label">URL DE LA IMAGEN (PORTADA)</label>
                                <input
                                    type="url"
                                    className="form-input"
                                    placeholder="Link a RAWG o cualquier imagen..."
                                    value={imagenUrl}
                                    onChange={(e) => setImagenUrl(e.target.value)}
                                />
                                <div className="preview-box">
                                    {imagenUrl ? (
                                        <img src={imagenUrl} alt="Vista previa" className="preview-img" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="preview-placeholder">❌ Imagen no válida</span>'; }} />
                                    ) : (
                                        <div className="preview-placeholder">
                                            <span style={{ fontSize: '2rem' }}>🖼️</span>
                                            <p>Vista Previa de la Portada</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit">💾 GUARDAR PRODUCTO EN INVENTARIO</button>
                            <Link to="/admin/inventario" className="btn-cancel">
                                ❌ Cancelar y volver al inventario
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminAgregarProducto;