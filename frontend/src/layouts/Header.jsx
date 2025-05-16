import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logoAlzhivida from '/images/alzhividalogo.jpg';

function Header ()  {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-xl p-1.5 w-[calc(100%-1rem)] mx-2 fixed top-0 z-50 rounded-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-0">
        {/* Logo + texto, alineados verticalmente */}
        <div className="flex items-center gap-2">
          <img src={logoAlzhivida} alt="Logo" style={{ width: '70px', height: 'auto' }} />
          <div className="text-xl font-bold text-[#5F16BF]">Alzhivida</div>
        </div>

        {/* Menú central en md+ */}
        <div className="hidden md:flex gap-8">
          <a href="#" className="hover:!text-[#461f99] text-lg">Sesiones</a>
          <a href="#" className="hover:!text-[#461f99] text-lg">Videos</a>
          <a href="#" className="hover:!text-[#461f99] text-lg">Comunidad</a>
          <a href="#" className="hover:!text-[#461f99] text-lg">Red Alzhivida</a>
        </div>

        {/* Botones derecha */}
        <div className="hidden md:flex gap-6">
          <a href="#" className="px-4 py-2 border rounded-lg bg-[#D9D9D9] hover:bg-[#a6a6a6] text-lg">Crear Cuenta</a>
          <a href="#" className="px-4 py-2 border rounded-lg bg-[#7926FF] hover:bg-[#5b2ea4] text-lg text-white">Iniciar Sesión</a>
        </div>

        {/* Botón hamburguesa móvil */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 mt-4 px-4">
          <a href="#" className="hover:!text-[#461f99] text-lg w-full text-center">Sesiones</a>
          <a href="#" className="hover:!text-[#461f99] text-lg w-full text-center">Videos</a>
          <a href="#" className="hover:!text-[#461f99] text-lg w-full text-center">Comunidad</a>
          <a href="#" className="hover:!text-[#461f99] text-lg w-full text-center">Red Alzhivida</a>
          <hr className="w-full border-t my-2" />
          <div className="flex gap-4 justify-center w-full">
            <a href="#" className="px-4 py-2 border rounded-lg bg-[#D9D9D9] hover:bg-[#a6a6a6] ">Crear Cuenta</a>
            <a href="#" className="px-4 py-2 border rounded-lg bg-[#D9D9D9] hover:bg-[#a6a6a6] ">Iniciar Sesión</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
