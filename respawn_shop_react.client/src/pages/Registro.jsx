import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const authStyles = `
.auth-page { display: flex; justify-content: center; align-items: center; min-height: 75vh; padding: 2rem; }
.auth-card { background: #111128; border: 1px solid #1e1e3f; border-radius: 16px; padding: 3rem; width: 100%; max-width: 450px; box-shadow: 0 0 30px rgba(0,212,255,0.05); text-align: center; position: relative; overflow: hidden; }
.auth-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #00D4FF, #7B2FBE); }
.auth-title { font-family: 'Orbitron', sans-serif; font-size: 2rem; font-weight: 900; color: #FFFFFF; margin-bottom: 0.5rem; }
.auth-subtitle { color: #A0ADB8; font-family: 'Inter', sans-serif; font-size: 0.95rem; margin-bottom: 2.5rem; }
.input-group { display: flex; flex-direction: column; text-align: left; margin-bottom: 1.5rem; }
.input-label { color: #00D4FF; font-family: 'Orbitron', sans-serif; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; letter-spacing: 1px; }
.auth-input { background: #0a0a1a; border: 1px solid #30363d; color: #FFFFFF; padding: 14px 16px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 1rem; transition: all 0.3s ease; outline: none; }
.auth-input:focus { border-color: #7B2FBE; box-shadow: 0 0 15px rgba(123, 47, 190, 0.3); }
.auth-btn { width: 100%; background: linear-gradient(135deg, #00D4FF, #7B2FBE); color: white; border: none; padding: 16px; border-radius: 10px; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; margin-top: 1rem; box-shadow: 0 0 20px rgba(0,212,255,0.2); }
.auth-btn:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(0,212,255,0.4); }
.auth-footer { margin-top: 2rem; color: #A0ADB8; font-family: 'Inter', sans-serif; font-size: 0.9rem; }
.auth-link { color: #00FF88; text-decoration: none; font-weight: 700; margin-left: 5px; transition: color 0.3s ease; }
.auth-link:hover { color: #00D4FF; text-decoration: underline; }
`;

function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [exito, setExito] = useState(''); // ESTADO PARA EL MENSAJE DE ÉXITO

    const navigate = useNavigate();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setExito('');

        const payload = {
            id: 0,
            nombre: nombre,
            apellido: "Usuario",
            correo: email,
            passwordHash: password,
            direccionEnvio: "Sin especificar",
            rol: "Cliente"
        };

        try {
            const response = await fetch('https://localhost:7284/api/Usuarios/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // AQUÍ REEMPLAZAMOS EL ALERT FEO
                setExito('🎉 ¡Registro exitoso! Llevándote al login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMensaje('Hubo un error al registrar. El correo podría estar en uso.');
            }
        } catch (error) {
            console.error("Error conectando al API:", error);
            setMensaje('Error de conexión con el servidor 🚨');
        }
    };

    return (
        <>
            <style>{authStyles}</style>
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Crear Cuenta</h2>
                    <p className="auth-subtitle">Únete a la comunidad de Respawn Shop</p>

                    {/* CAJAS DE MENSAJES */}
                    {mensaje && <div style={{ backgroundColor: 'rgba(255, 0, 110, 0.1)', border: '1px solid #FF006E', color: '#FF006E', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold' }}>{mensaje}</div>}
                    {exito && <div style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid #00FF88', color: '#00FF88', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold' }}>{exito}</div>}

                    <form onSubmit={manejarSubmit}>
                        <div className="input-group">
                            <label className="input-label">NOMBRE (O NICKNAME)</label>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="Tu nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">CORREO ELECTRÓNICO</label>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="jugador@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">CONTRASEÑA</label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-btn">
                            REGISTRARSE 🚀
                        </button>
                    </form>

                    <div className="auth-footer">
                        ¿Ya tienes una cuenta?
                        <Link to="/login" className="auth-link">Inicia sesión aquí</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registro;