import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Sessions from "../pages/Sessions";
import NoEncontrado from "../pages/NoEncontrado";
import Principal from "../pages/Principal";
import Forgotten from "../pages/Forgotten";
import Prueba from "../layouts/Prueba";
import RutaPrivada from "./RutaPrivada";

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Swal from "sweetalert2";

// Este componente se encargará de monitorear la sesión
function SessionChecker() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const expiresAt = useAuthStore((state) => state.expiresAt);
  const navigate = useNavigate();

  useEffect(() => {
    if (!expiresAt) return;

    const timeRemaining = expiresAt - Date.now();

    const timer = setTimeout(() => {
      logout();
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        confirmButtonText: 'Entendido'
      }).then(() => {
        navigate('/login');
      });
    }, timeRemaining);

    return () => clearTimeout(timer);
  }, [expiresAt, logout, navigate]);

  return null; // No renderiza nada
}

function AppRoutes() {
  return (
    <Router>
      <SessionChecker />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotten" element={<Forgotten />} />

        {/* 🔒 Rutas protegidas */}
        <Route
          path="/sessions"
          element={
            <RutaPrivada>
              <Sessions />
            </RutaPrivada>
          }
        />
        <Route
          path="/principal"
          element={
            <RutaPrivada>
              <Principal />
            </RutaPrivada>
          }
        />
        <Route
          path="/prueba"
          element={
            <RutaPrivada>
              <Prueba />
            </RutaPrivada>
          }
        />

        {/* Página no encontrada */}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
