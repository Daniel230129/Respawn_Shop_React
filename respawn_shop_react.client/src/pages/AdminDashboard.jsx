import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const rol = localStorage.getItem('rol');

    useEffect(() => {
        if (rol !== 'Administrador') {
            navigate('/');
        }
    }, [rol, navigate]);

    return (
        <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '70vh', color: 'white' }}>
            <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: '#00D4FF', marginBottom: '20px' }}>
                👑 Panel de Control (Modo Dios)
            </h1>
            <p style={{ color: '#A0ADB8', marginBottom: '40px' }}>
                Bienvenido Administrador. Selecciona lo que deseas gestionar:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>

                <div style={{ background: '#111128', border: '1px solid #1e1e3f', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>📦</h2>
                    <h3 style={{ fontFamily: 'Orbitron', marginBottom: '10px' }}>Inventario</h3>
                    <p style={{ color: '#A0ADB8', fontSize: '0.9rem', marginBottom: '20px' }}>Agregar, editar o eliminar juegos de la tienda.</p>
                    <Link
                        to="/admin/inventario"
                        style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #00D4FF, #7B2FBE)', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxSizing: 'border-box' }}
                    >
                        Gestionar Productos
                    </Link>
                </div>

                <div style={{ background: '#111128', border: '1px solid #1e1e3f', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>🧾</h2>
                    <h3 style={{ fontFamily: 'Orbitron', marginBottom: '10px' }}>Pedidos</h3>
                    <p style={{ color: '#A0ADB8', fontSize: '0.9rem', marginBottom: '20px' }}>Ver y gestionar las compras realizadas por los clientes.</p>
                    <Link
                        to="/admin/pedidos"
                        style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #FF006E, #7B2FBE)', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxSizing: 'border-box' }}
                    >
                        Gestionar Pedidos
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;