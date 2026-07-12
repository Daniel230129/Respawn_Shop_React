import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RutaProtegida({ children, requireAdmin }) {
    const { usuario } = useContext(AuthContext);

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const rolDelUsuario = usuario.rol || usuario.role || usuario['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (requireAdmin && rolDelUsuario !== 'Administrador') {
        return <Navigate to="/catalogo" replace />;
    }

    return children;
}

export default RutaProtegida;