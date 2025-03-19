import React, { useContext, useState, useEffect } from 'react';
import { CompraContext } from "../../Providers/Compra";
import { FaCartPlus } from "react-icons/fa";
import './Promos.css';

export function Promos() {
    const { AñadirCarrito } = useContext(CompraContext);
    const [promociones, setPromociones] = useState([]);

    useEffect(() => {
        fetch('/promociones.json')
            .then(response => response.json())
            .then(data => setPromociones(data.promociones))
            .catch(error => console.error('Error loading promotions:', error));
    }, []);

    const añadirPromo = (promo) => {
        if (promo) {
            AñadirCarrito(promo);
        }
    };

    return (
        <div className="promos-container">
            <p className="promos-titulo bold">Promociones</p>
            <div className="promos-lista">
                {promociones.map((promo) => (
                    <div className="promo-card" key={promo.id}>
                        <div className="promo-info">
                            <p className="promo-nombre">{promo.nombre}</p>
                            <p className="promo-descripcion">{promo.descripcion}</p>
                            <p className="promo-precio"><strong>Precio:</strong> ${promo.precio}</p>
                        </div>
                        <button
                            className="promo-boton"
                            onClick={() => añadirPromo(promo)}
                        >
                            <p>Añadir al carrito</p>
                            <FaCartPlus />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}