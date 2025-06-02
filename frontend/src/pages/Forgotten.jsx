import { useState, useEffect } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HeaderMod from "../layouts/HeaderMod";
import logoAlzhivida from "/images/logoalzhivida.png";
import Loading from "../layouts/Loading";

function Forgotten() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(180);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Error", "Por favor, ingresa tu correo.", "warning");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire("Código enviado", "Revisa tu correo para el código.", "success");
      setStep(2);
      setTimer(180);
    }, 1000);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code !== "123456") {
      Swal.fire("Error", "Código incorrecto.", "error");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      Swal.fire("Campos vacíos", "Completa ambos campos.", "warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire("Éxito", "Tu contraseña ha sido actualizada.", "success");
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <HeaderMod />
      <div className="min-h-screen pb-14 bg-gradient-to-br from-[#835ec0] via-[#8d68e9de] to-[#5f4ec4] flex flex-col items-center">
        {loading && <Loading />}
      <div className="relative bg-white border-4 mt-30 border-gray-100 px-8 py-10 rounded-3xl shadow-xl w-80 max-w-sm text-center before:content-[''] before:absolute before:top-4 before:left-4 before:w-70 before:h-[8px] before:bg-[#7F5AFA] after:content-[''] after:absolute after:bottom-3 after:left-4 after:w-70 after:h-[8px] after:bg-[#7F5AFA]">
         {/* Logo y nombre de Alzhivida */}
            <div className="flex flex-col items-center mb-3">
            <img src={logoAlzhivida} alt="Logo" className="w-30 h-auto mb-2" />
            <h1 className="!text-3xl !font-signika !font-bold !text-[#5F16BF]">Alzhivida</h1>
          </div>
          {step === 1 && (
            <form onSubmit={handleSendCode} className="flex flex-col gap-4 text-left">
              <div>
                <label className="text-sm font-semibold">Correo electrónico</label>
                <div className="relative mt-1">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md bg-[#f5f5f5] border border-gray-300 focus:outline-none focus:ring-2  focus:ring-[#7F5AFA]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#7F5AFA] text-white py-2 rounded-lg hover:bg-[#6a4fd2] transition-all font-semibold"
              >
                Enviar código
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="flex flex-col gap-4 text-left">
              <div>
                <label className="text-sm font-semibold">Código de verificación</label>
                <input
                  type="text"
                  placeholder="Ingresa el código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-md bg-[#f5f5f5] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F5AFA]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#7F5AFA] text-white py-2 rounded-lg hover:bg-[#6a4fd2] transition-all font-semibold"
              >
                Verificar
              </button>

              <p className="text-sm text-center mt-1 text-gray-600">
                ¿No recibiste el código?
                {timer === 0 ? (
                  <button
                    onClick={() => setTimer(180)}
                    className="text-[#7F5AFA] ml-1 font-semibold hover:underline"
                  >
                    Reenviar código
                  </button>
                ) : (
                  <span className="text-[#7F5AFA] font-semibold ml-1">{formatTime(timer)}</span>
                )}
              </p>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4 text-left">
              <div>
                <label className="text-sm font-semibold">Nueva contraseña</label>
                <div className="relative mt-1">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    className="w-full pl-10 pr-10 py-2 rounded-md bg-[#f5f5f5] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F5AFA]"
                  />
                  <div
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Confirmar contraseña</label>
                <div className="relative mt-1">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar contraseña"
                    className="w-full pl-10 pr-10 py-2 rounded-md bg-[#f5f5f5] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F5AFA]"
                  />
                  <div
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#7F5AFA] text-white py-2 rounded-lg hover:bg-[#6a4fd2] transition-all font-semibold"
              >
                Guardar nueva contraseña
              </button>
            </form>
          )}

          <Link
            to="/login"
            className="block text-sm mt-4 text-center text-gray-700 no-underline cursor-pointer"
          >
            ¿Ya tienes cuenta?{" "}
            <span className="text-[#7F5AFA] font-semibold hover:underline">Inicia sesión</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Forgotten;
