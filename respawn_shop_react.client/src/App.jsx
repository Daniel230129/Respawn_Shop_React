import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import ProductoDetalle from './pages/ProductoDetalle';
import Login from './pages/Login';
import Registro from './pages/Registro';
import AdminDashboard from './pages/AdminDashboard'
import AdminInventario from './pages/AdminInventario';
import AdminAgregarProducto from './pages/AdminAgregarProducto';
import MisPedidos from './pages/MisPedidos';
import AdminPedidos from './pages/AdminPedidos';

import './App.css';

function App() {
    return (
        /* 2. ENVOLVEMOS TODA LA APLICACIÓN CON EL AUTHPROVIDER */
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/catalogo" element={<Catalogo />} />
                            <Route path="/carrito" element={<Carrito />} />
                            <Route path="/producto/:id" element={<ProductoDetalle />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Registro />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/inventario" element={<AdminInventario />} />
                            <Route path="/admin/agregar-producto" element={<AdminAgregarProducto />} />
                            <Route path="/admin/pedidos" element={<AdminPedidos />} />
                            <Route path="/mis-pedidos" element={<MisPedidos />} />
                        </Routes>
                    </Layout>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;