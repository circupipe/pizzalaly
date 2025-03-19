import React, { useContext, useState } from 'react';
import { CompraContext } from "../../Providers/Compra";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa";
import './Carrito.css'

export function Carrito() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const [isTransferencia, setIsTransferencia] = useState(false);
    const [direccion, setDireccion] = useState('');
    const { carrito, BorrarProducto } = useContext(CompraContext);

    function generarEnlaceWhatsApp() {
        const waMensaje = `Hola, queria pedir:\n${carrito.map((producto) => 
            `${producto.cantidad} ${producto.nombre} (${producto.tamaño}).`
        ).join("\n")}\n${isDelivery ? `Quiero delivery\nDirección: ${direccion}` : 'Lo retiro yo'}\nPago con ${isTransferencia ? 'Transferencia' : 'Efectivo'}`;
        const mensajeCodificado = encodeURIComponent(waMensaje.trim());
        return `https://wa.me/5491158559056?text=${mensajeCodificado}`;
    }

    return (
        <>
            <div className={`carrito-container ${isOpen ? 'open' : ''}`}>
                <button 
                    className="carrito-cerrar"
                    onClick={() => setIsOpen(false)}
                >
                    ×
                </button>
                <h6 className="carrito-titulo">Carrito</h6>
                {carrito.map((producto, i) => (
                    <div className="carrito-item" key={i}>
                        <p className="carrito-cantidad">{producto.cantidad}</p>
                        <p className="carrito-nombre bold">{producto.nombre}</p>
                        <p className="carrito-tamaño">{producto.tamaño}</p>
                        <button 
                            className="carrito-boton-eliminar"
                            onClick={() => BorrarProducto(producto)}
                        >
                            <FaTrashAlt size={15} />
                        </button>
                    </div>
                ))}
                <div className="toggle-container">
                    <div className={`toggle-switch ${isDelivery ? 'delivery' : 'pickup'}`}>
                        <button 
                            className={`toggle-option ${!isDelivery ? 'active' : ''}`}
                            onClick={() => setIsDelivery(false)}
                        >
                            Retiro
                        </button>
                        <button 
                            className={`toggle-option ${isDelivery ? 'active' : ''}`}
                            onClick={() => setIsDelivery(true)}
                        >
                            Delivery
                        </button>
                        <div className="slider"></div>
                    </div>
                </div>

                {isDelivery && (
                    <div className="direccion-container">
                        <input
                            type="text"
                            placeholder="Ingrese su dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            className="direccion-input"
                        />
                    </div>
                )}

                <div className="toggle-container">
                    <div className={`toggle-switch ${isTransferencia ? 'transferencia' : 'efectivo'}`}>
                        <button 
                            className={`toggle-option ${!isTransferencia ? 'active' : ''}`}
                            onClick={() => setIsTransferencia(false)}
                        >
                            Efectivo
                        </button>
                        <button 
                            className={`toggle-option ${isTransferencia ? 'active' : ''}`}
                            onClick={() => setIsTransferencia(true)}
                        >
                            Transferencia
                        </button>
                        <div className="slider"></div>
                    </div>
                </div>

                <a href={generarEnlaceWhatsApp()} target="_blank" rel="noopener noreferrer">
                    <button className="carrito-boton-enviar">Enviar Compra</button>
                </a>
            </div>
            <button 
                className="carrito-floating-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaCartPlus size={40} />
                {carrito.length > 0 && (
                    <span className="carrito-badge">{carrito.length}</span>
                )}
            </button>
        </>
    );
}
