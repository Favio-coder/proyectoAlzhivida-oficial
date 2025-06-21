//Librerias importantes para el funcionamiento
import { useState } from "react";

//Iconos
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";

//Libreria para la navegación
import { data, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../layouts/Loading";
import HeaderMod from "../layouts/HeaderMod";
import logoAlzhivida from "/images/logoalzhivida.png";

//Link
import { Link } from "react-router-dom";

//Llamar a la capa de servicios 
import { loginUsuario } from "../services/autenticacionService";

//Invocar el Store 
import { useAuthStore } from "../store/authStore";


//Mock
import { mockUser, mockToken } from "../mock/mockDevUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const esMock = import.meta.env.VITE_MODO_MOCK === "true"

    const dataEnviar = {
      correo: email,
      contrasena: password
    }

    // if (!email || !password) {
    //   Swal.fire({
    //     title: "Campos vacíos",
    //     text: "Por favor, completa todos los campos.",
    //     icon: "warning",
    //     confirmButtonText: 'Volver'
    //   });
    //   return;
    // }
    setLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 1500))

      if (esMock) {
        // Simula retardo de red
        await new Promise((res) => setTimeout(res, 1000));

        useAuthStore.getState().login({
          token: mockToken,
          usuarioRecuperado: mockUser,
        });

        navigate("/principal");
        return;
      }

      loginUsuario(dataEnviar)
        .then(response => {
          useAuthStore.getState().login({
            token: response.data.token,
            usuarioRecuperado: response.data.usuarioRecuperado
          })

          navigate("/principal");
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo iniciar sesión, intentalo más tarde',
            confirmButtonText: 'Entendido'
          })
          console.error("Error en login:", error);
        });

      //navigate("/principal");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo iniciar sesión, intentalo más tarde',
        confirmButtonText: 'Entendido'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-14 bg-gradient-to-br from-[#835ec0] via-[#8d68e9de] to-[#5f4ec4] flex flex-col items-center">
      {loading && <Loading />}
      <HeaderMod />
      <div className="relative bg-white border-4 mt-30 border-gray-100 px-8 py-10 rounded-3xl shadow-xl w-80 max-w-sm text-center before:content-[''] before:absolute before:top-4 before:left-4 before:w-70 before:h-[8px] before:bg-[#7F5AFA] after:content-[''] after:absolute after:bottom-3 after:left-4 after:w-70 after:h-[8px] after:bg-[#7F5AFA]">
        {/* Logo y nombre de Alzhivida */}
        <div className="flex flex-col items-center mb-3">
          <img src={logoAlzhivida} alt="Logo" className="w-30 h-auto mb-2" />
          <h1 className="!text-3xl !font-signika !font-bold !text-[#5F16BF]">Alzhivida</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3 text-left">
          <div>
            <label className="text-sm font-semibold">Ingresa tu correo electrónico</label>
            <div className="relative mt-1">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#f5f5f5] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F5AFA]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Ingresa tu contraseña</label>
            <div className="relative mt-1">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-md bg-[#f5f5f5] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F5AFA]"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="text-right text-sm">
            <Link to="/forgotten" className="text-[#7F5AFA] hover:underline">
              ¿Olvidaste la contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-[#7F5AFA] text-white py-2 rounded-lg hover:bg-[#6a4fd2] transition-all font-semibold text-center"
          >
            INICIAR SESIÓN
          </button>

          <Link
            to="/register"
            className="block text-center text-sm mt-1 text-black cursor-pointer !no-underline"
          >
            ¿No tienes cuenta?{" "}
            <span className="text-[#7a14ff] font-semibold hover:underline">
              Regístrate
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
