import React from "react";
import logoAlzhivida from '/images/alzhividalogo.jpg';

function NoEncontrado(){
    return (
        <div className="h-screen flex items-center justify-center flex-col text-center">
            <img src={logoAlzhivida} alt="Logo" style={{ width: '100px', height: 'auto' }} />
            <div className="text-xl font-bold text-[#5F16BF]">Alzhivida</div>
            <h1 className="text-5xl font-bold text-[#5F16BF]">404</h1>
            
            <p className="text-xl mt-4">¡Ups! No encontramos lo que buscas</p>
            <p className="text-l">Quizá tomaste un camino equivocado. Vuelve a la página principal</p>
            <a href="/" style={{ textDecoration: "none" }} className="mt-6 px-4 py-2 bg-[#7926FF] text-white rounded-lg hover:bg-[#5b2ea4]">
                Volver al inicio
            </a>
        </div>
    )

}

export default NoEncontrado