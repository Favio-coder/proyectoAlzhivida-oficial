import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faPen,
  faTrash,
  faXmark,
  faPaperclip,
  faFloppyDisk,
  faEye, faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


//Invocar Store
import { useAuthStore } from "../store/authStore";

export default function ModalEditPerfil({ open, onOpenChange }) {
  const [openContrasena, setOpenContrasena] = useState(false);

  const usuario = useAuthStore((state) => state.user)

  console.log("Usuario del store: ", usuario)

  const [form, setForm] = useState({
    nombre: usuario?.l_nomUsua || "",
    apellido: usuario?.l_apellUsua || "",
    genero: usuario?.l_genUsua || "",
    pais: usuario?.l_paisUsua || "",
    nacimiento: usuario?.f_nacimiento
      ? new Date(usuario.f_nacimiento).toISOString().split("T")[0]
      : ""
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
            <Dialog.Title className="sr-only">Editar perfil de usuario</Dialog.Title>
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
                {/* Nombre */}
                <div>
                  <label className="text-sm font-semibold">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md text-sm"
                  />
                </div>

                {/* Apellido */}
                <div>
                  <label className="text-sm font-semibold">Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md text-sm"
                  />
                </div>

                {/* Género */}
                <div>
                  <label className="text-sm font-semibold">Género:</label>
                  <select
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md text-sm focus:outline-none"
                  >
                    <option value="">Género</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                  </select>
                </div>


                {/* País (select) */}
                <div>
                  <label className="text-sm font-semibold">País:</label>
                  <select
                    name="pais"
                    value={form.pais}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-100 px-3 py-2 rounded-md text-sm"
                  >
                    <option value="">País</option>
                    {[
                      "Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", "España",
                      "El Salvador", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay",
                      "Perú", "República Dominicana", "Uruguay", "Venezuela"
                    ].map((pais) => (
                      <option key={pais} value={pais}>
                        {pais}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha de nacimiento */}
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

              <button className="bg-[#8a6fff] text-white font-bold hover:bg-[#7b5ce7] py-2 px-4 rounded flex items-center">
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
          <Dialog.Overlay className="fixed inset-0 z-50" />
          <Dialog.Content
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className="fixed top-1/2 left-1/2 w-[90vw] max-w-sm max-h-[90vh] bg-white rounded-xl 
        -translate-x-1/2 -translate-y-1/2 shadow-xl z-60 overflow-y-auto"
          >
            {/* Cabecera */}
            <div className="bg-[#8a6fff] text-white flex justify-between items-center px-4 py-2 rounded-t-xl">
              <h5 className="text-base font-semibold flex items-center gap-2">
                <FontAwesomeIcon icon={faPen} />
                Cambio de contraseña
              </h5>
              <Dialog.Close asChild>
                <button aria-label="Cerrar modal" className="text-white hover:text-gray-200">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </Dialog.Close>
            </div>

            {/* Cuerpo del formulario */}
            <form className="p-6 space-y-5 text-sm text-gray-800">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Contraseña anterior
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#8a6fff]"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#8a6fff]"
                />
              </div>



              <button
                type="submit"
                className="w-full mt-1 py-2 bg-[#8a6fff] text-white rounded-lg font-semibold hover:bg-[#7a5be0] transition duration-200"
              >
                Guardar cambios
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </>
  );
}
