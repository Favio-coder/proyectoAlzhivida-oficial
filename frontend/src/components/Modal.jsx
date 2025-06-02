import React, {useEffect, useRef, useState} from "react";


function Modal({ id="exampleModal"}){
    const modalRef = useRef(null)

     return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
       data-bs-backdrop="static"
      data-bs-keyboard="false"
      ref={modalRef}
    >
    
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Título del Modal</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            Este es el contenido del modal. Puedes colocar cualquier texto o componente aquí.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
