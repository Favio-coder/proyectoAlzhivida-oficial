import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Header ()  {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-xl p-4 w-[calc(100%-1rem)] mx-2 fixed top-0  z-50 rounded-xl">
      {/* Contenedor del Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo (Izquierda) */}
        <div className="text-xl font-bold">Mi Logo</div>

        {/* Menú Normal (Centro en pantallas grandes) */}
        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          <a href="#" className="hover:!text-[#461f99]">Item 1</a>
          <a href="#" className="hover:!text-[#461f99]">Item 2</a>
          <a href="#" className="hover:!text-[#461f99]">Item 3</a>
          <a href="#" className="hover:!text-[#461f99]">Item 4</a>
        </div>

        {/* Botones de usuario (Derecha) */}
        <div className="hidden md:flex gap-4">
          <a href="#" className="px-4 py-2 border rounded-lg hover:bg-gray-100">Crear Cuenta</a>
          <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Iniciar Sesión</a>
        </div>

        {/* Botón de Menú Hamburguesa (Visible en pantallas pequeñas) */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Menú Móvil (Visible solo cuando isOpen es true) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 mt-4">
            <a href="#" className="hover:!text-[#461f99]">Item 1</a>
            <a href="#" className="hover:!text-[#461f99]">Item 2</a>
            <a href="#" className="hover:!text-[#461f99]">Item 3</a>
            <a href="#" className="hover:!text-[#461f99]">Item 4</a>
          <hr className="w-full border-t" />
          <div className="flex gap-4">
            <a href="#" className="px-4 py-2 border rounded-lg hover:bg-gray-100" >Crear Cuenta</a>
            <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Iniciar Sesión</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
