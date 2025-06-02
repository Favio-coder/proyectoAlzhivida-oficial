import React, { useEffect } from "react";

function ModalModContrasena({ id = "modContrasenaModal" }) {
  useEffect(() => {
    const modalEl = document.getElementById(id);

    const handleHidden = () => {
      // Eliminar el último backdrop si hay más de uno
      const backdrops = document.querySelectorAll('.modal-backdrop');
      if (backdrops.length > 0) {
        backdrops[backdrops.length - 1].remove();
      }

      // Solución extra: quitar clase 'modal-open' si solo queda un modal
      const modalsOpen = document.querySelectorAll('.modal.show');
      if (modalsOpen.length === 0) {
        document.body.classList.remove('modal-open');
        document.body.style = ""; // limpiar overflow hidden
      }
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
  }, [id]);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="modContrasenaLabel"
      aria-hidden="true"
      data-bs-backdrop="true"
      data-bs-keyboard="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ zIndex: 1060 }}>
          <div className="modal-header bg-[#6c5ce7] text-white">
            <h5 className="modal-title">Cambiar Contraseña</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
              style={{ filter: 'invert(1) grayscale(100%) brightness(200%)' }}
            />
          </div>
          <div className="modal-body">
            <input type="password" className="form-control mb-2" placeholder="Nueva contraseña" />
            <input type="password" className="form-control mb-3" placeholder="Confirmar contraseña" />
            <button className="btn btn-primary w-full">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalModContrasena;
