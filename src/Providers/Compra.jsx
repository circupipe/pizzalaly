import React,  { createContext, useState, useEffect} from 'react';

export const CompraContext = createContext();

export const CompraProvider = ({ children }) => {

    const [productos, setProductos] = useState([]); 
    const JSON_URL = "/productos.json";
    const [carrito, setCarrito] = useState([]);
    const [mensaje, setMensaje] = useState(false);
  
    let CallProductos = async () => {
        try {
            let response = await fetch(JSON_URL);
            let data = await response.json();
    
            setProductos(Array.isArray(data.productos) ? data.productos : []);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };
    
    useEffect(() => {
      CallProductos();
    }, [JSON_URL]);

    function AñadirCarrito(producto) {
        setCarrito(prevCarrito => {
            // Si es una promo
            if (producto.productos) {
                const promoItem = {
                    nombre: producto.nombre,
                    cantidad: 1,
                    tamaño: "Promo",
                    precio: producto.precio
                };
                
                if (!prevCarrito.find(item => 
                    item.nombre === promoItem.nombre && 
                    item.tamaño === "Promo"
                )) {
                    return [...prevCarrito, promoItem];
                } else {
                    MostrarMensaje();
                    return prevCarrito;
                }
            }
            
    

    function BorrarProducto(producto) {
        setCarrito((prevLista) => prevLista.filter((elemento) => elemento !== producto));
    
    };

    function MostrarMensaje() {
        setMensaje(true)
        const timer = setTimeout(() => {
            setMensaje(false); 
        }, 2000);
    };

    return (
        <CompraContext.Provider value={{ productos, setProductos, carrito, AñadirCarrito, BorrarProducto, mensaje }}>
            {children}
        </CompraContext.Provider>
    );
};