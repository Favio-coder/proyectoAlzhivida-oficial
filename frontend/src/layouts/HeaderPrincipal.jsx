import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fontsource/signika-negative";
import { faBars, faTimes, faCircleUser, faBell, faPen, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logoAlzhivida from '/images/alzhividalogo.jpg';

import Modal from "../components/Modal";
import ModalEditPerfil from "../components/ModalEditPerfil";
import ModalModContrasena from "../components/ModalModContrasena";


//Store
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";


function HeaderPrincipal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [modPerfil, setModPerfil] = useState(false)
  const [showNotificationsMobile, setShowNotificationsMobile] = useState(false)
  const [modPerfilMobile, setModPerfilMobile] = useState(false)

  const [editPerfilOpen, setEditPerfilOpen] = useState(false)

  //Uso del Store 
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const usuarioGlobal = useAuthStore((state) => state.user)


  const abrirMiniVentana = ({ tipo }) => {
    // Tipo 1: Para notificaciones 
    // Tipo 2: Para más función de perfil 
    if (tipo == 1) {
      if (modPerfil) {
        setModPerfil(false)
      }
      setShowNotifications(!showNotifications)
    } else {
      if (showNotifications) {
        setShowNotifications(false)
      }
      setModPerfil(!modPerfil)
    }
  }

  const abrirMiniVentanaMobile = ({ tipo }) => {
    // Tipo 1: Para notificaciones 
    // Tipo 2: Para más función de perfil 
    if (tipo == 1) {
      if (modPerfilMobile) {
        setModPerfilMobile(false)
      }
      setShowNotificationsMobile(!showNotifications)
    } else {
      if (showNotificationsMobile) {
        setShowNotificationsMobile(false)
      }
      setModPerfilMobile(!modPerfil)
    }
  }

  return (
    <div>
      {import.meta.env.VITE_MODO_MOCK === "true" && (
        <div className="fixed top-[90px] left-1/2 transform -translate-x-1/2 z-40 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-md text-sm font-semibold shadow-md">
          ⚠️ Estás en modo de desarrollo (mock).
        </div>
      )}
      <nav className="bg-white shadow-xl p-2 w-[calc(100%-5rem)] mx-12 fixed top-2 z-50 rounded-xl">
        <div className="flex justify-between items-center max-w-7xl mx-auto sm:px-4 px-1 lg:px-0">
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
          <div className="relative hidden lg:flex gap-4 text-gray-700 font-medium h-10 items-center">
            {/* Campana con dropdown */}
            <div className="flex items-center h-full">
              <FontAwesomeIcon
                icon={faBell}
                className="text-2xl cursor-pointer hover:text-[#5F16BF]"
                onClick={() => abrirMiniVentana({ tipo: 1 })}
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
                      "Evento disponible",
                    ].map((notif, idx) => (
                      <li key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {notif}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Nombre centrado */}
            <div className="flex items-center h-full">
              <p className="text-base leading-none"> {(usuarioGlobal?.l_nomUsua && usuarioGlobal?.l_apellUsua)
                ? `${usuarioGlobal.l_nomUsua} ${usuarioGlobal.l_apellUsua}`
                : "Usuario invitado"}</p>
            </div>

            {/* Icono usuario */}
            <div className="relative flex items-center h-full">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-3xl cursor-pointer hover:text-[#5F16BF]"
                onClick={() => abrirMiniVentana({ tipo: 2 })}
              />
              {modPerfil && (
                <div className="absolute right-0 mt-2 w-90 bg-white shadow-xl rounded-lg z-50 h-24 pb-1.5">
                  <div className="px-4 py-2">
                    <div
                      className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        setModPerfil(false);
                        setEditPerfilOpen(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                      <p className="m-0">Editar cuenta</p>
                    </div>

                    <div
                      className="flex items-center gap-2 px-2 py-1 mt-2 text-red-600 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      <FontAwesomeIcon icon={faRightToBracket} />
                      <span className="m-0 text-red-600">Cerrar sesión</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Botón menú hamburguesa y notificación (móvil) */}
          {/* Botón notificaciones (móvil) */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              className="lg:hidden text-gray-900"
              onClick={() => {
                setShowNotificationsMobile(!showNotificationsMobile)
                setIsOpen(false) // Cierra menú principal si estaba abierto
              }}
              aria-label="Notificaciones"
            >
              <FontAwesomeIcon icon={faBell} size="lg" />
            </button>

            {/* Menú de notificaciones móvil */}
            {showNotificationsMobile && (
              <div className="lg:hidden absolute top-[4.5rem] left-1/2 transform -translate-x-1/2 w-[90%] bg-white shadow-xl rounded-lg z-50 max-h-64 overflow-y-auto animate-fade-in">
                <p className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-800">Notificaciones</p>
                <ul className=" text-sm text-gray-700">
                  {[
                    "Nueva notificación 1",
                    "Nueva notificación 2",
                    "Recordatorio de sesión",
                    "Mensaje del cuidador",
                    "Evento disponible"
                  ].map((notif, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {notif}
                    </li>
                  ))}
                </ul>
              </div>
            )}



            <button
              className="lg:hidden text-gray-900"
              onClick={
                () => {
                  setIsOpen(!isOpen)
                  setShowNotificationsMobile(false)
                }
              }
              aria-label="Menú"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="lg:hidden bg-white mt-4 rounded-xl shadow-lg px-4 py-4 flex flex-col items-center gap-3 animate-fade-in"
            style={{
              maxHeight: "calc(80vh - 5rem)",
              overflowY: "auto"
            }}>
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
                icon={faCircleUser}
                className="text-3xl text-[#5F16BF] hover:text-[#3b0ca3]"
              />
              <p className="text-base text-center leading-tight">
                {usuarioGlobal?.l_nomUsua} {usuarioGlobal?.l_apellUsua}
              </p>
            </div>
            <div className="">
              {/* Editar cuenta */}
              <div
                className="flex items-center gap-2 px-2 py-1  rounded cursor-pointer transition-all duration-300 
                hover:bg-[#ede9fe] hover:text-[#3a21b6] hover:ring-2 hover:ring-[#bfbdffb7] hover:shadow-lg "
                onClick={() => setEditPerfilOpen(true)}
              >
                <FontAwesomeIcon icon={faPen} />
                <p className="m-0 ">Editar cuenta</p>
              </div>


              {/* Cerrar sesión */}
              <div className="flex items-center gap-2 px-2 py-1 mt-2 text-red-600  rounded cursor-pointer transition-all duration-300 
                hover:bg-[#ede9fe] hover:text-[#3a21b6] hover:ring-2 hover:ring-[#bfbdffb7] hover:shadow-lg"
                onClick={() => {
                  logout()
                  navigate("/")
                }}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <a href="#" className="m-0 text-red-600">
                  Cerrar sesión
                </a>
              </div>
            </div>
          </div>
        )}


      </nav>
      <ModalEditPerfil open={editPerfilOpen} onOpenChange={setEditPerfilOpen} />

    </div>
  );
}

export default HeaderPrincipal;
