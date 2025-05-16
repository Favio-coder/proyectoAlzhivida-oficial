import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoEncontrado from "../pages/NoEncontrado";

function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login/>} />
                <Route path="*" element={<NoEncontrado />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes