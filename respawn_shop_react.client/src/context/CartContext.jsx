/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

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

        //toast.success(`¡${producto.nombre} añadido al carrito! 🎮`);
    };

    // Función para borrar un juego completo
    const eliminarDelCarrito = (id) => {
        setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
    };

    // Función para los botones de + y -
    const actualizarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        setCarrito((carritoActual) =>
            carritoActual.map((item) =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito }}>
            {children}
        </CartContext.Provider>
    );
}