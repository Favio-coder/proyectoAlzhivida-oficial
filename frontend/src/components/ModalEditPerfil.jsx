import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ModalEditPerfil({ open, onOpenChange }) {
  const [openContrasena, setOpenContrasena] = useState(false);

  return (
    <>
      {/* Modal Editar Perfil */}
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 max-w-lg w-full max-h-[80vh] overflow-auto
                       bg-white rounded-md p-6 -translate-x-1/2 -translate-y-1/2 shadow-lg z-50"
          >
            <Dialog.Title className="flex items-center text-xl font-bold mb-4 text-[#8a6fff]">
              <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
              Edición de perfil
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Cerrar modal"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </Dialog.Close>

            {/* Formulario simple */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre(s)"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Apellido(s)"
                className="w-full border rounded px-3 py-2"
              />
              {/* Botón para abrir modal cambiar contraseña */}
              <button
                className="mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-semibold"
                onClick={() => setOpenContrasena(true)}
                type="button"
              >
                <FontAwesomeIcon icon={faPen} className="mr-1" />
                Cambiar contraseña
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Modal Cambiar Contraseña (Modal hijo sin overlay para evitar oscurecer doble) */}
      <Dialog.Root open={openContrasena} onOpenChange={setOpenContrasena}>
        <Dialog.Portal>
          {/* No overlay para que el fondo no oscurezca más */}
          <Dialog.Content
            className="fixed top-1/2 left-1/2 max-w-md w-full bg-white rounded-md p-6
                       -translate-x-1/2 -translate-y-1/2 shadow-lg z-60"
          >
            <Dialog.Title className="text-lg font-semibold text-[#6c5ce7] mb-3">
              Cambiar Contraseña
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Cerrar modal"
                type="button"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </Dialog.Close>

            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <button
              className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              type="submit"
            >
              Guardar
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
