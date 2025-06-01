/**
 Creado por: Richard Favio Asturimac Medina - faviusam@gmail.com 
 Modificado por: Richard Favio Asturimac Medina - faviusam@gmail.com 
 Ultima modificación: 31/05/2025
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fontsource/signika-negative";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logoAlzhivida from '/images/alzhividalogo.jpg';

function HeaderMod () {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-xl p-1.5 w-[calc(100%-5rem)] mx-12 fixed top-2 z-50 rounded-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-0">

        {/* Logo + texto */}
        <Link to="/" className="flex items-center gap-2 ml-2">
          <img src={logoAlzhivida} alt="Logo" className="w-[70px] h-auto" />
          <div className="text-2xl font-bold text-[#5F16BF]">Alzhivida</div>
        </Link>

        {/* Menú central (md+) */}
        <div className="hidden lg:flex items-center gap-6 md:gap-10 lg:gap-8 ml-4 md:ml-10 lg:ml-20">
          {[
          { nombre: "Nosotros", enlace: "/#nosotros" },
          { nombre: "Suscripción", enlace: "/#suscripcion" },
          { nombre: "Docente", enlace: "/#docente" },
          { nombre: "Preguntas", enlace: "/#preguntas" },
          { nombre: "Contacto", enlace: "/#contacto" }
        ].map((item, index) => (
          <a
            key={index}
            href={item.enlace}
            className="relative group text-base font-medium text-gray-700 hover:!text-[#6a16bfe2] transition-all duration-300"
          >
            {item.nombre}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#5F16BF] transition-all duration-300 group-hover:w-full"></span>
          </a>
))}
        </div>

       {/* Botones (md+) */}
        <div className="hidden md:flex items-left gap-4 md:gap-6 lg:gap-8 ml-2 md:ml-8 lg:ml-12">
          <Link
            to="/register"
            className="text-sm font-semibold px-5 py-2 rounded-xl bg-[#e5e5e5] text-gray-800 hover:bg-[#b3b3b3] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Regístrate
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold px-5 py-2 rounded-xl bg-[#9178ff] text-white hover:bg-[#6d4df7] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Iniciar Sesión
          </Link>
        </div>
            
       {/* Botón hamburguesa móvil */}
        <button 
          className="lg:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>


      {/* Menú móvil */}
          {isOpen && (
      <div className="lg:hidden bg-white mt-4 rounded-xl shadow-lg px-4 py-4 flex flex-col items-center gap-2 animate-fade-in">
        {[
          { nombre: "Nosotros", enlace: "#nosotros" },
          { nombre: "Suscripción", enlace: "#suscripcion" },
          { nombre: "Docente", enlace: "#docente" },
          { nombre: "Preguntas", enlace: "#preguntas" },
          { nombre: "Contacto", enlace: "#contacto" }
        ].map((item, index) => (
          <a
            key={index}
            href={item.enlace}
            className="w-full text-center text-base text-gray-500 font-medium py-2 px-4 rounded-lg transition-all duration-300 
                      hover:bg-[#ede9fe] hover:text-[#3a21b6] hover:ring-2 hover:ring-[#bfbdffb7] hover:shadow-lg"
          >
            {item.nombre}
          </a>
        ))}
       <hr className="w-full border-t border-[#e0d8fc] my-3" />
      
      <div className="flex flex-col gap-3 w-full">
        <Link
          to="/register"
          className="w-full text-center font-semibold text-sm px-4 py-2 rounded-full bg-[#d4d4d4] text-gray-800 
                    hover:bg-[#a3a3a3] hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
        >
          Regístrate
        </Link>
        <Link
          to="/login"
          className="w-full text-center font-semibold text-sm px-4 py-2 rounded-full bg-[#8a6fff] text-white 
                    hover:bg-[#6a4bff] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
        >
          Iniciar Sesión
        </Link>
      </div>

      </div>
    )}
    </nav>
  );
}

export default HeaderMod;
