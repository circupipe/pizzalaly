import React, { useContext, useState } from 'react';
import { CompraContext } from "../../Providers/Compra";
import { FaCartPlus } from "react-icons/fa";
import './ListaProductos.css'
import { Carrito } from '../Carrito/Carrito';

export function ListaProductos() {
    // Inicialización del estado
    const { productos, AñadirCarrito } = useContext(CompraContext);
    const [tamaños, setTamaños] = useState([]);
    const [cantidades, setCantidades] = useState([]);

    // Inicializamos los estados cuando productos cambia
    React.useEffect(() => {
        if (Array.isArray(productos)) {
            setTamaños(productos.map(() => "mediano"));
            setCantidades(productos.map(() => 1));
        }
    }, [productos]);

    // Función actualizada
    const actualizarCantidad = (index, nuevaCantidad) => {
        const nuevasCantidades = [...cantidades];
        nuevasCantidades[index] = Math.max(1, Number(nuevaCantidad));
        setCantidades(nuevasCantidades);
    };

    function CrearProducto(producto, index) {
        let nuevoProducto = {
            nombre: producto.nombre,
            tamaño: tamaños[index],
            cantidad: cantidades[index]
        };
        AñadirCarrito(nuevoProducto);
    }

    const actualizarTamaño = (index, nuevoTamaño) => {
        const nuevosTamaños = [...tamaños];
        nuevosTamaños[index] = nuevoTamaño;
        setTamaños(nuevosTamaños);
    };

    return (
        <div className="productos-container">
            <p className="productos-titulo bold">Carta</p>
            <div className="productos-lista">
                {Array.isArray(productos) && productos.length > 0 ? (
                    productos.map((producto, i) => (
                        <div className="producto-card" key={i}>
                            <h4 className="producto-nombre">{producto.nombre}</h4>
                            <p className="producto-descripcion">{producto.descripcion}</p>
                            <p className="producto-precio"><strong>Precio:</strong> ${producto.precio}</p>
                            <div className="producto-opciones">
                                <div className="producto-tamaño">
                                    <label htmlFor={`tamaño-${i}`}>Tamaño:</label>
                                    <select
                                        id={`tamaño-${i}`}
                                        name="tamaño"
                                        value={tamaños[i]}
                                        onChange={(e) => actualizarTamaño(i, e.target.value)}
                                    >
                                        <option value="chico">Chico</option>
                                        <option value="mediano">Mediano</option>
                                        <option value="grande">Grande</option>
                                    </select>
                                </div>
                                <div className="producto-cantidad">
                                    <label htmlFor={`cantidad-${i}`}>Cantidad:</label>
                                    <div className="cantidad-control">
                                        <button 
                                            className="cantidad-btn"
                                            onClick={() => actualizarCantidad(i, Math.max(1, (cantidades[i] || 1) - 1))}
                                        >
                                            -
                                        </button>
                                        <span className="cantidad-valor">
                                            {cantidades[i] || 1}
                                        </span>
                                        <button 
                                            className="cantidad-btn"
                                            onClick={() => actualizarCantidad(i, (cantidades[i] || 1) + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="producto-boton"
                                onClick={() => CrearProducto(producto, i)}
                            >
                                <p>Añadir al carrito</p>
                                <FaCartPlus />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="productos-mensaje">Cargando datos o no hay productos disponibles</p>
                )}
            </div>
            <div>
                <Carrito/>
            </div>
        </div>
    );
}
