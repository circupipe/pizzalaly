import { FaSearch } from "react-icons/fa";
import './Home.css'
import React, { useState } from "react";
import { ListaProductos } from '../ListaProductos/ListaProductos';
import { Carrito } from '../Carrito/Carrito';
import { Promos } from "../Promos/Promos";

export function Home() {

    return(
        <>
        <div className="flex-center-center p-3 width-100 banner">
            <div className="search-container flex-center-center border-1">
                <input className="search" type="text" placeholder="Buscar Productos..." />
                <div className="color-1 button-search flex-center-center pointer bg-color-1 size-1">
                    <FaSearch />
                </div>
            </div>
        </div>
        <Promos />
        <ListaProductos />
        <Carrito/>  
        </>
    )
}