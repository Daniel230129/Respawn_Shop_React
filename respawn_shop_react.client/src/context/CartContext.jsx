/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

// Creamos el contexto
export const CartContext = createContext();

// Creamos el "Proveedor" que va a envolver nuestra app
export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Función para añadir juegos al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((carritoActual) => {
            const juegoExiste = carritoActual.find((item) => item.id === producto.id);

            if (juegoExiste) {
                return carritoActual.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...carritoActual, { ...producto, cantidad: 1 }];
        });
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito }}>
            {children}
        </CartContext.Provider>
    );
}