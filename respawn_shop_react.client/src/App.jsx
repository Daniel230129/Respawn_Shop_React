import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import ProductoDetalle from './pages/ProductoDetalle'; // <-- IMPORTAMOS LA NUEVA PÁGINA
import './App.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/catalogo" element={<Catalogo />} />
                        <Route path="/carrito" element={<Carrito />} />

                        {/* ESTA ES LA NUEVA RUTA DINÁMICA */}
                        <Route path="/producto/:id" element={<ProductoDetalle />} />
                    </Routes>
                </Layout>
            </Router>
        </CartProvider>
    );
}

export default App;