/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const token = localStorage.getItem('token');
        const nombre = localStorage.getItem('nombreUsuario');
        if (token && nombre) {
            return { nombre: nombre, token: token };
        }
        return null;
    });

    const login = (datosUsuario, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('nombreUsuario', datosUsuario.nombre);
        setUsuario(datosUsuario);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombreUsuario');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}