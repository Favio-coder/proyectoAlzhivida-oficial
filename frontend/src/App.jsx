// Rutas
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAuthStore } from './store/authStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function App() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  useEffect(() => {
    checkSession();
  }, []);



  return <AppRoutes />;
}

export default App;
