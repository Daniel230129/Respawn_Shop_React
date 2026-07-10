import Header from './Header';
import Footer from './Footer';

// RÚBRICA: Que se pasen props y children de componente Padre a componente Hijo
function Layout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0d0d0d', color: 'white' }}>
            <Header />

            {/* Todo lo que le pasemos al Layout se renderizará aquí adentro */}
            <main style={{ flex: '1', padding: '2rem' }}>
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;