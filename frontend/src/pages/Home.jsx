import Header from "../components/Header";
import { useEffect } from "react";




function Home() {
  return (
    <div className="bg-[#8589f7] min-h-screen w-full">
        <Header />
        <div className="pt-25 px-4"> 
            <h1 className="text-white text-2xl">Contenido debajo del Header</h1>
            <p className="text-white">Este contenido siempre estará debajo del Header.</p>
        </div>    
    </div>
  );
}

export default Home;
