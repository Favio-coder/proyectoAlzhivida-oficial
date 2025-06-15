import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faPen,
  faTrash,
  faXmark,
  faPaperclip,
  faFloppyDisk
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ModalEditPerfil({ open, onOpenChange }) {
  const [openContrasena, setOpenContrasena] = useState(false);

  const [form, setForm] = useState({
    nombre: "Richard Favio",
    apellido: "Asturimac Medina",
    genero: "Masculino",
    pais: "Perú",
    nacimiento: "2005-02-18",
  });

  const [preview, setPreview] = useState("");
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/12225/12225881.png"

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0  z-40" />
          <Dialog.Content
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className="fixed top-1/2 left-1/2 w-[95vw] max-w-3xl bg-white rounded-2xl 
           -translate-x-1/2 -translate-y-1/2 z-50 shadow-xl
           max-h-[90vh] overflow-y-auto"
          >
            {/* Cabecera */}
            <div className="bg-[#8a6fff] text-white flex justify-between items-center px-6 py-2 rounded-t-2xl">
              <h2 className="text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
                Edición de perfil
              </h2>
              <Dialog.Close asChild>
                <button aria-label="Cerrar" className="hover:text-gray-200">
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
              </Dialog.Close>
            </div>

            {/* Cuerpo */}
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Foto */}
              <div className="flex flex-col items-center">
                <img
                  src={defaultImage}
                  alt="foto de perfil"
                  className="w-55 h-auto rounded-full object-cover mb-2 border"
                />
                <label className="flex items-center text-sm px-3 py-1 border rounded-md hover:bg-gray-100 cursor-pointer">
                  <FontAwesomeIcon icon={faPaperclip} className="mr-1" />
                  Subir foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Formulario */}
              <div className="grid grid-cols-2 gap-4">
                {["nombre", "apellido", "genero", "pais"].map((campo) => (
                  <div key={campo}>
                    <label className="text-sm font-semibold capitalize">{campo}:</label>
                    <input
                      type="text"
                      name={campo}
                      value={form[campo]}
                      onChange={handleChange}
                      className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="text-sm font-semibold">Fecha de nacimiento:</label>
                  <input
                    type="date"
                    name="nacimiento"
                    value={form.nacimiento}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-wrap justify-center gap-4 px-6 pb-6">
              <button
                onClick={() => setOpenContrasena(true)}
                className="border-2 border-green-500 text-green-700 hover:bg-green-500 hover:text-white font-semibold py-2 px-4 rounded flex items-center"
              >
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                CAMBIAR CONTRASEÑA
              </button>

              <button className="bg-red-600 text-white font-bold hover:bg-red-700 py-2 px-4 rounded flex items-center">
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                ELIMINAR CUENTA
              </button>

              <button className="bg-[#8a6fff] text-white font-bold hover:bg-[#7b5ce7] py-2 px-4 rounded">
                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                GUARDAR CAMBIOS
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Modal cambiar contraseña */}
      <Dialog.Root open={openContrasena} onOpenChange={setOpenContrasena}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0  z-50" />
          <Dialog.Content
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className="fixed top-1/2 left-1/2 w-[90vw] max-w-sm bg-white rounded-xl 
                 -translate-x-1/2 -translate-y-1/2 shadow-xl z-60 overflow-hidden"
          >
            {/* Cabecera */}
            <div className="bg-[#8a6fff] text-white flex justify-between items-center px-4 py-2">
              <h5 className="text-sm font-semibold flex items-center gap-2">
                <FontAwesomeIcon icon={faPen} className="text-white" />
                Cambio de contraseña
              </h5>
              <Dialog.Close asChild>
                <button aria-label="Cerrar modal" className="text-white hover:text-gray-200">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </Dialog.Close>
            </div>

            {/* Formulario */}
            <div className="p-4 space-y-4">
              {[
                { label: "Contraseña anterior:", name: "oldPassword" },
                { label: "Nueva contraseña:", name: "newPassword" },
                { label: "Nueva contraseña:", name: "confirmPassword" },
              ].map(({ label, name }, index) => (
                <div key={index}>
                  <label className="block text-sm font-bold mb-1">{label}</label>
                  <input
                    type="password"
                    name={name}
                    className="w-full bg-[#f3f3f3] rounded-lg px-4 py-2 text-sm outline-none"
                  />
                </div>
              ))}

              <button
                className="w-full py-2 rounded bg-[#8a6fff] text-white font-bold uppercase text-sm hover:bg-[#7a5be0]"
                type="submit"
              >
                Guardar cambios
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
