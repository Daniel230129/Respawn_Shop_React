import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Carrito() {
    // Nos conectamos al cerebro global para sacar los datos del carrito
    const { carrito, vaciarCarrito } = useContext(CartContext);

    // Calculamos el total de dinero a pagar
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#007bff', marginBottom: '2rem' }}>🛒 Tu Carrito de Compras</h1>

            {carrito.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <h2 style={{ color: '#aaa' }}>Tu carrito está vacío 😔</h2>
                    <Link to="/catalogo">
                        <button style={{ marginTop: '1rem', backgroundColor: '#00c864', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Ir a comprar
                        </button>
                    </Link>
                </div>
            ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e1e1e', padding: '2rem', borderRadius: '10px', border: '1px solid #333' }}>

                    {/* Lista de juegos agregados */}
                    {carrito.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0' }}>{item.nombre}</h3>
                                <p style={{ margin: 0, color: '#aaa' }}>Cantidad: {item.cantidad}</p>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#00c864' }}>
                                ${(item.precio * item.cantidad).toFixed(2)}
                            </div>
                        </div>
                    ))}

                    {/* Resumen del total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '2px dashed #555' }}>
                        <h2 style={{ margin: 0 }}>Total a pagar:</h2>
                        <h2 style={{ margin: 0, color: '#007bff' }}>${total.toFixed(2)}</h2>
                    </div>

                    {/* Botones de acción */}
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        <button onClick={vaciarCarrito} style={{ backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Vaciar Carrito
                        </button>
                        <button onClick={() => alert('¡Compra simulada con éxito, compai!')} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Procesar Pago
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Carrito;