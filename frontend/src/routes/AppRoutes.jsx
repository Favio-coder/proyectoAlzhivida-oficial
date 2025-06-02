import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Sessions from "../pages/Sessions";
import NoEncontrado from "../pages/NoEncontrado";
import Principal from "../pages/Principal";
import Prueba from "../layouts/Prueba";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sessions" element={<Sessions />} /> 
        <Route path="/principal" element={<Principal/>} />
        <Route path="/prueba" element={<Prueba/>}/>
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
