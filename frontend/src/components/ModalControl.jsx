import React, { useState } from "react";
import ModalEditPerfil from "./ModalEditPerfil";
import ModalModContrasena from "./ModalModContrasena";

function ModalesContainer() {
  const [showEditPerfil, setShowEditPerfil] = useState(false);
  const [showModContrasena, setShowModContrasena] = useState(false);

  // Al abrir el modal de cambiar contraseña, cerramos el editar perfil
  const abrirModalContrasena = () => {
    setShowEditPerfil(false);
    setShowModContrasena(true);
  };

  // Al cerrar modal de contraseña, por ejemplo, podemos volver a editar perfil o cerrar todo
  const cerrarModalContrasena = () => {
    setShowModContrasena(false);
    // Si quieres volver al modal perfil, descomenta esta línea:
    // setShowEditPerfil(true);
  };

  return (
    <div>
      <button onClick={() => setShowEditPerfil(true)}>
        Abrir Editar Perfil
      </button>

      <ModalEditPerfil
        show={showEditPerfil}
        onClose={() => setShowEditPerfil(false)}
        abrirModalContrasena={abrirModalContrasena}
      />

      <ModalModContrasena
        show={showModContrasena}
        onClose={cerrarModalContrasena}
      />
    </div>
  );
}

export default ModalesContainer;
