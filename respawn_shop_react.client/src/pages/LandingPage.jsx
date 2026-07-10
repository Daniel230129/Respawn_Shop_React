import { useState } from 'react';

function LandingPage() {
    // RÚBRICA: Componente con un elemento que cambie de estado
    const [mostrarOfertas, setMostrarOfertas] = useState(false);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', color: '#007bff', marginBottom: '10px' }}>Bienvenido a Respawn Shop</h1>
            <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2rem' }}>Tu tienda gamer definitiva en República Dominicana.</p>

            {/* RÚBRICA: Elementos estáticos (imágenes) */}
            <div style={{ margin: '2rem 0' }}>
                <img
                    src="/PS5Control.png"
                    alt="Promo Control PS5"
                    style={{ width: '100%', maxWidth: '700px', borderRadius: '15px', border: '2px solid #333' }}
                />
            </div>

            <button
                onClick={() => setMostrarOfertas(!mostrarOfertas)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '15px 30px', fontSize: '1.2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                {mostrarOfertas ? "Ocultar Ofertas Flash" : "Ver Ofertas Flash 🔥"}
            </button>

            {/* RÚBRICA: Componente que cambie la visibilidad de un elemento */}
            {mostrarOfertas && (
                <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#1e1e1e', borderRadius: '10px', border: '2px dashed #00c864', display: 'inline-block', minWidth: '300px' }}>
                    <h3 style={{ color: '#00c864', fontSize: '1.8rem', margin: '0 0 10px 0' }}>¡30% de Descuento!</h3>
                    <p style={{ margin: 0 }}>En controles seleccionados. ¡Solo por hoy!</p>
                </div>
            )}
        </div>
    );
}

export default LandingPage;