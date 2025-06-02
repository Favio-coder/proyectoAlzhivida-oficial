import React from "react";
import Modal from "../components/Modal";
import ModalEditPerfil from "../components/ModalEditPerfil";

function Prueba() {
  return (
    <div className="p-4">
      {/* Botón que abre el modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#editPefilModal"
      >
        Abrir Modal
      </button>

      {/* El Modal viene de un componente hijo */}
      <ModalEditPerfil id="editPefilModal" />
    </div>
  );
}

export default Prueba;
