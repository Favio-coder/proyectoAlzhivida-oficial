import { useState } from "react";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import logoAlzhivida from "/images/logoalzhivida.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@fontsource/signika-negative";
import { useNavigate } from "react-router-dom";

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

  const toggleVisibility = (type) => {
    if (type === "password") setShowPassword((prev) => !prev);
    if (type === "repeat") setShowRepeatPassword((prev) => !prev);
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    if (email.trim()) setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code.trim()) setStep(3);
  };

  const handleCreateAccount = (e) => {
  e.preventDefault();

  if (password === repeatPassword && password.length >= 8) {
    setStep(4); // Esto es lo que debe activar el formulario del paso 4
  } else {
    alert("Las contraseñas no coinciden o no cumplen con los requisitos");
  }
};
  const navigate = useNavigate();

  const handleSubmitDatosPersonales = (e) => {
  e.preventDefault();

  if (!aceptoTerminos) {
    alert("Debes aceptar los términos y condiciones");
    return;
  }

  console.log({
    nombres,
    apellidos,
    genero,
    pais,
    fechaNacimiento,
  });

  // Redirigir al finalizar exitosamente
  navigate("/sessions");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#835ec0] via-[#8d68e9de] to-[#5f4ec4] flex flex-col items-center">
      <Header />
      <div className="relative bg-white border-4 mt-30 border-gray-100 px-8 py-10 rounded-3xl shadow-xl w-[80%] max-w-sm text-center before:content-[''] before:absolute before:top-4 before:left-4 before:w-70 before:h-[8px] before:bg-[#7F5AFA] after:content-[''] after:absolute after:bottom-3 after:left-4 after:w-70 after:h-[8px] after:bg-[#7F5AFA]">
        <div className="flex flex-col items-center mb-6">
          <img src={logoAlzhivida} alt="Logo" className="w-30 h-auto mb-2" />
          <h1 className="!text-3xl !font-signika !font-bold !text-[#5F16BF]">Alzhivida</h1>
        </div>

        {step === 1 && (
          <>
            <div className="bg-green-500 text-white font-semibold px-4 py-2 rounded mb-6 text-sm leading-tight">
              Recuerda: Verificar el correo electrónico es importante antes de crear una cuenta
            </div>
            <form onSubmit={handleVerifyEmail} className="space-y-4 text-left">
              <label className="block text-sm font-medium text-gray-700">Ingresa tu correo electrónico</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
            <form onSubmit={handleVerifyCode} className="space-y-4 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2.5">Inserta el código</label>
              <input
                type="text"
                placeholder="Código"
                className="w-full px-4 py-2 rounded bg-gray-100 border !focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <p className="text-sm text-gray-600 text-left mt-1">
                Volver a reenviar el código{" "}
                <span className="text-purple-600 hover:underline cursor-pointer">click aquí</span>
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
              required
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
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Seleccione su género</label>
              <select
                className="w-full px-4 py-2 rounded bg-gray-100 border focus:outline-none"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
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
                required
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
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={aceptoTerminos}
                onChange={(e) => setAceptoTerminos(e.target.checked)}
                required
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
