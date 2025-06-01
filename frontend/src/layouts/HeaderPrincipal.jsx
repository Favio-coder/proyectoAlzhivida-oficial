import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fontsource/signika-negative";
import { faBars, faTimes, faCircleUser, faBell } from "@fortawesome/free-solid-svg-icons";
import logoAlzhivida from '/images/alzhividalogo.jpg';

function HeaderPrincipal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-white shadow-xl p-2 w-[calc(100%-5rem)] mx-12 fixed top-2 z-50 rounded-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-0">
        {/* Logo + texto */}
        <Link to="/" className="flex items-center gap-2 ml-2">
          <img src={logoAlzhivida} alt="Logo" className="w-[70px] h-auto" />
          <div className="text-2xl font-bold text-[#5F16BF]">Alzhivida</div>
        </Link>

        {/* Menú central (lg+) */}
        <div className="hidden lg:flex items-center gap-8 ml-10">
          {[
            { nombre: "Comunidad", enlace: "#comunidad" },
            { nombre: "Sesiones", enlace: "#sesiones" },
            { nombre: "Membresía", enlace: "#membresía" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.enlace}
              className="relative group text-base font-medium text-gray-700 hover:text-[#6a16bfe2] transition-all duration-300"
            >
              {item.nombre}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#5F16BF] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Usuario + notificaciones (lg+) */}
        <div className="relative hidden lg:flex items-center gap-4 text-gray-700 font-medium">
          {/* Campana con dropdown */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faBell}
              className="text-3xl cursor-pointer hover:text-[#5F16BF]"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
                <div className="absolute right-0 mt-2 w-164 bg-white shadow-xl rounded-lg z-50 max-h-60 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-800">
                    Notificaciones
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                    {[
                        "Nueva notificación 1",
                        "Nueva notificación 2",
                        "Recordatorio de sesión",
                        "Mensaje del cuidador",
                        "Evento disponible"
                    ].map((notif, idx) => (
                        <li key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {notif}
                        </li>
                    ))}
                    </ul>
                </div>
                )}

          </div>

          {/* Nombre */}
          <p className="text-base leading-none self-center">
            Richard Favio Asturimac Medina
          </p>

          {/* Icono usuario */}
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-4xl text-bg-gray-100 cursor-pointer hover:text-[#5F16BF] self-center"
          />
        </div>

        {/* Botón menú hamburguesa (móvil) */}
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
        <div className="lg:hidden bg-white mt-4 rounded-xl shadow-lg px-4 py-4 flex flex-col items-center gap-3 animate-fade-in">
          {[
            { nombre: "Comunidad", enlace: "#comunidad" },
            { nombre: "Sesiones", enlace: "#sesiones" },
            { nombre: "Membresía", enlace: "#membresía" },
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

          {/* Usuario + notificaciones (móvil) */}
          <div className="flex flex-col items-center gap-2 text-gray-700 font-medium">
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl hover:text-[#5F16BF]"
            />
            <p className="text-base text-center leading-tight">
              Richard Favio Asturimac Medina
            </p>
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-3xl text-[#5F16BF] hover:text-[#3b0ca3]"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default HeaderPrincipal;
