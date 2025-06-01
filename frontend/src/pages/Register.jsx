/**
 Creado por: Brittany Gonzales Quiñonez
 Modificado por: Richard Favio Asturimac Medina - faviusam@gmail.com 
 Ultima modificación: 31/05/2025
*/

import { useEffect, useState } from "react";
import HeaderMod from "../layouts/HeaderMod";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import logoAlzhivida from "/images/logoalzhivida.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@fontsource/signika-negative";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

//Importar servicios 
import { verificarEmail, verificarCodigo, registrarCuidadorNoProfesional  } from '../services/autenticacionService'
import { setGlobalLoadingHandler } from "../api/apiAutenticacion";
import Loading from "../layouts/Loading";

function Register() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState("");
  const [pais, setPais] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [loading, setLoading] = useState(false)
  
  //Use effect para el icono de carga
  useEffect(() => {
    setGlobalLoadingHandler(setLoading);
  }, [])


  // Tiempo para volver a enviar otro código 
  const [timer, setTimer] = useState(0)
   useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer])

  const startTimer = () => {
    setTimer(200); 
  };


  const toggleVisibility = (type) => {
    if (type === "password") setShowPassword((prev) => !prev);
    if (type === "repeat") setShowRepeatPassword((prev) => !prev);
  };

  const esEmailVerificado = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Inserta un correo electrónico válido para continuar',
        confirmButtonText: 'Entendido',
      });
      return;
    }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Inserta un correo electrónico válido para continuar',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    verificarEmail(email)
      .then(response => {
        const mensaje = response.data.mensaje;

        if (mensaje.trim() === 'Ya se ha enviado un código recientemente') {
          Swal.fire({
            icon: 'warning',
            title: 'Código ya fue enviado',
            text: 'Ya se ha enviado un código recientemente a tu correo.',
            confirmButtonText: 'Entendido',
            footer: '<a href="#" id="ir-step-2">Haz clic aquí para ingresar el código</a>',
          })
          return
        }

        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Revisa tu bandeja de entrada o spam para ingresar el código',
          confirmButtonText: 'Entendido'
        });

        setStep(2)

        startTimer()
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Opps!! ' + error.response.data?.mensaje ,
            confirmButtonText: 'Entendido'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el correo. Intenta nuevamente.',
            confirmButtonText: 'Entendido'
          })
        }
        console.error('Error Axios:', error);
      })
  }


  const esCodigoVerificado = (e) => {
    e.preventDefault()


    if (!code.trim()){
        Swal.fire(
          {icon:'error',
          title: 'Error',
          text: 'Inserta el código enviado al correo electrónico para continuar',
          confirmButtonText: 'Entendido'
        }
        )
        return
    }

    try{
      verificarCodigo(email,code).then((response) => {
        if(!response.data.valido){
          Swal.fire(
            {
              icon:'error',
              title: 'Error',
              text: 'El código insertado no es correcto',
              confirmButtonText: 'Entendido'
            }
          )
        }else{
          Swal.fire(
            {
              icon:'success',
              title: 'Existo',
              text: 'El código insertado  es correcto',
              confirmButtonText: 'Entendido'
            }
          )

          setStep(3)
        }


      })

    }catch(err){
      console.error("Existe un error: ", err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo validar el código. Intenta nuevamente',
        confirmButtonText: 'Entendido'
      })
    }

  }

  const reEnviarCodigo = () => {
    if (timer === 0) {
      verificarEmail(email)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Correo reenviado",
            text: "Se ha reenviado el código a tu correo.",
            confirmButtonText: "Entendido",
          });
          startTimer(); 
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo reenviar el código. Intenta más tarde.",
            confirmButtonText: "Entendido",
          });
        });
    }
  }

  const formatTimer = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }


  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Entendido'
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres',
        confirmButtonText: 'Entendido'
      });
    } else {
      setStep(4);
    }
  }

  //Usar navigate para irte a otra carpeta
  const navigate = useNavigate();

  const handleSubmitDatosPersonales = async (e) => {
    e.preventDefault();

    if (!aceptoTerminos) {
      Swal.fire({
        icon: 'warning',
        title: 'Términos no aceptados',
        text: 'Debes aceptar los términos y condiciones para continuar',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const data = {
      nombre: nombres,
      apellido: apellidos,
      fechaNacimiento: fechaNacimiento,
      genero: genero,
      foto: '',
      pais: pais,
      contrasena: password,
      correo: email
    }

    try {
      const response = await registrarCuidadorNoProfesional(data);

      // Solo navega si la respuesta fue exitosa
      navigate("/sessions");
    } catch (err) {
      console.error("Existe un error: ", err);

      // Errores que no atrapa el interceptor
      if (!err.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo conectar con el servidor. Intenta más tarde.',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  const getPasswordStrength = () => {
    if (!password) return "";

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 1:
      default:
        return "Muy insegura";
      case 2:
        return "Poco segura";
      case 3:
        return "Segura";
      case 4:
        return "Muy segura";
    }
  };

  const passwordStrength = getPasswordStrength();
  const strengthColor =
    passwordStrength === "Muy segura"
      ? "text-green-600"
      : passwordStrength === "Segura"
      ? "text-yellow-600"
      : "text-red-600";

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'ir-step-2') {
      e.preventDefault()
      setStep(2)
      Swal.close() 
    }
  })

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#835ec0] via-[#8d68e9de] to-[#5f4ec4] flex flex-col items-center">
      {loading && <Loading></Loading>}
      
      <HeaderMod />
      
      <div className="relative bg-white border-4 mt-30 border-gray-100 px-8 py-10 rounded-3xl shadow-xl w-[80%] max-w-sm text-center before:content-[''] before:absolute before:top-4 before:left-4 before:w-70 before:h-[8px] before:bg-[#7F5AFA] after:content-[''] after:absolute after:bottom-3 after:left-4 after:w-70 after:h-[8px] after:bg-[#7F5AFA]">
        
        {/* Logo y nombre de Alzhivida */}
        <div className="flex flex-col items-center mb-6">
          <img src={logoAlzhivida} alt="Logo" className="w-30 h-auto mb-2" />
          <h1 className="!text-3xl !font-signika !font-bold !text-[#5F16BF]">Alzhivida</h1>
        </div>

        {step === 1 && (
          <>
            <div className="bg-green-500 text-white  px-4 py-2 rounded mb-6 text-sm leading-tight">
              <span className="font-semibold">Recuerda: </span> Verificar el correo electrónico es importante antes de crear una cuenta
            </div>
            <form onSubmit={esEmailVerificado} className="space-y-4 text-left">
              <label className="block text-sm font-medium text-gray-700">Ingresa tu correo electrónico</label>
              <input
                type="text"
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="mt-4 w-full bg-[#9178ff] text-white font-semibold py-2 rounded hover:bg-[#6d4df7] transition">
                VERIFICAR CORREO
              </button>
            </form>
            <p className="text-sm mt-4 text-center">
              Ya tengo una cuenta creada{" "}
              <Link to="/login" className="text-purple-600 hover:underline">Iniciar sesión</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <form onSubmit={esCodigoVerificado} className="space-y-4 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2.5">Inserta el código</label>
              <input
                type="text"
                placeholder="Código"
                className="w-full px-4 py-2 rounded bg-gray-100 border !focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <p className="text-sm text-gray-600 text-left mt-1">
                Volver a reenviar el código{" "}
                <span
                className={`text-purple-600 hover:underline ${
                  timer > 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (timer === 0) reEnviarCodigo();
                }}
              >
                {timer > 0 ? `(${formatTimer(timer)})` : "click aquí"}
              </span>
              </p>
              <button type="submit" className="mt-2 w-full bg-[#9178ff] text-white font-semibold py-2 rounded hover:bg-[#6d4df7] transition">
                VERIFICAR CÓDIGO
              </button>
            </form>
            <p className="text-sm mt-2 text-center">
              Ya tengo una cuenta creada{" "}
              <Link to="/login" className="text-purple-600 hover:underline">Iniciar sesión</Link>
            </p>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleCreateAccount} className="space-y-1 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Escribe una contraseña</label>
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Escribe una contraseña"
                className="w-full px-4 py-2 rounded bg-gray-100 border !focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => toggleVisibility("password")}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className={`text-sm mt-1 ${strengthColor}`}>{passwordStrength}</p>

            <label className="block text-sm font-medium text-gray-700 mb-1">Repite la contraseña</label>
            <div className="relative mb-2">
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repetir la contraseña"
                className="w-full px-4 py-2 rounded bg-gray-100 border !focus:outline-none"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("repeat")}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-1 w-full bg-[#9178ff] text-white font-semibold py-2 rounded hover:bg-[#6d4df7] transition mb-4"
            >
              CONTINUAR
            </button>
          </form>
        )}

     {step === 4 && (
        <form onSubmit={handleSubmitDatosPersonales} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1">Escriba su nombre</label>
            <input
              type="text"
              placeholder="Nombres"
              className="w-full px-4 py-2 rounded bg-gray-100 border !focus:outline-none"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Escriba sus apellidos</label>
            <input
              type="text"
              placeholder="Apellidos"
              className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Seleccione su género</label>
              <select
                className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Género</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Seleccione su país</label>
              <select
                className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
              >
                <option value="">País</option>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cuba">Cuba</option>
                <option value="Ecuador">Ecuador</option>
                <option value="España">España</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Honduras">Honduras</option>
                <option value="México">México</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Panamá">Panamá</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Perú">Perú</option>
                <option value="República Dominicana">República Dominicana</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </select>
            </div>
          </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={aceptoTerminos}
                onChange={(e) => setAceptoTerminos(e.target.checked)}
              />
              <label className="text-sm ml-2">Aceptar términos y condiciones</label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#9178ff] text-white font-semibold py-2 rounded hover:bg-[#6d4df7] transition"
            >
              CREAR CUENTA
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
