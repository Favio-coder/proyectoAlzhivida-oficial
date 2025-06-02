import React, { useState, useEffect } from 'react';
import "@fontsource/signika-negative";
import { ChevronDown } from "lucide-react";
import Header from "../layouts/Header";
import fondo01 from "/images/fondo01.png";
import logoAlzhivida from "/images/logoalzhivida.png";
import imagenDocente from "/images/imagen_docente.jpg";
import { Wrench, Boxes, BookOpen } from 'lucide-react';

function Counter({ end }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / 50;
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [end]);
  return <>{count.toLocaleString()}+</>;
}



function Home() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
      {
        question: "¿Cómo puedo ser parte de Alzhivida?",
        answer: "Como organización buscamos expandirnos de personas profesionales o con experiencia, para que puedan ser visibilizadas en nuestra plataforma es por ello que todo el año se revise las solicitudes. Para acceder a ello solo encescitar acer click en ¨Docente¨ ubicado en la parte superior y a continaución en ¨Comunicarte con Alzhivida",
      },
      {
        question: "¿Puedo acceder a alguna clase de manera gratuita?",
        answer: "Sí. Tienes que registrarte para acceder a dos clases gratuitas, te animamos pero a suscribirte para que puedas acceder a más beneficios",
      },
      {
        question: "¿Alzhivida es gratuito?",
        answer: "Sí, al igual que los docentes de la plataforma Alzhivida busca que cualquier persona pueda acceder a esta información, es por ello que puedes acceder con una cuenta básica y obtener tickets semanales.",
      },

    {
        question: "¿Cómo se procesa nuestro pago para acceder a la cuenta premium",
        answer: "Primero registrarse para tener una cuenta, con la cuenta ya ingresada hacer click en suscribirse. Los pagos se realizaran mensualmente y se tardará un 48 horas máximo en activarse.",
      },
      
    ];

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
    

  return (
    <div className="w-full min-h-screen">
      <Header />

      {/* Sección Hero con imagen de fondo */}
      <section
        className="w-full h-[90vh] flex items-center text-left px-6 md:px-16"
        style={{
          backgroundImage: `url(${fondo01})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 ml-2">
            <img src={logoAlzhivida} alt="Logo" className="w-[70px] h-auto" />
            <div className="text-4xl md:text-5xl font-signika font-bold text-[#5F16BF] leading-none tracking-tight mt-2">
              lzhivida
            </div>
          </div>
          <p className="mt-4 text-lg md:text-xl text-black font-medium max-w-md">
            "Aquí comienza una red de apoyo real para ti, tu familia y todos quienes necesitan una guía en este camino."
          </p>
          <a
            href="#videos"
            className=" text-decoration-none inline-block mt-4 px-8 py-1 rounded-full text-white text-lg font-semibold 
              bg-[#9162f7] hover:bg-[#6d4df7] transition-all duration-300 
              shadow-md hover:shadow-xl border-[5px] border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5e3aff]"
          >
            Ingresa Ahora
          </a>
        </div>
      </section>

      {/* Sección de nosotros */}
     <section className="bg-[#f3f6fb] text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Texto izquierdo */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 ml-2">
            <img src={logoAlzhivida} alt="Logo" className="w-[70px] h-auto" />
            <div className="text-4xl md:text-5xl font-signika font-bold text-[#5F16BF] leading-none tracking-tight mt-2">
              lzhivida
            </div>
          </div>
            <p className="text-gray-600 mt-3 mb-6">
              Buscamos mejorar la calidad de vida de los cuidadores, reducir la sobrecarga emocional y fomentar una comunidad de apoyo, promoviendo el bienestar tanto de los cuidadores como de los pacientes.
            </p>
            <button className="text-sm font-semibold !px-1 !py-2 !rounded-xl bg-[#9b65ff] text-white hover:bg-[#6d4df7] transition-all duration-300 shadow-sm hover:shadow-md">
              UNA COMUNIDAD MÁS GRANDE CONTIGO
            </button>
          </div>

          {/* Servicios a la derecha */}
          <div className="relative pl-15 space-y-16 border-l-2 border-gray-300 sm:mr-3">
            {/* Línea con íconos */}
            <div className="absolute left-[-32px] top-0 space-y-29 pl-2">
              <div className="w-14 h-14 bg-[#726bff] rounded-md flex items-center justify-center">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div className="w-14 h-14 bg-[#a896f5] rounded-md flex items-center justify-center">
                <Boxes className="w-8 h-8 text-white" />
              </div>
              <div className="w-14 h-14 bg-[#7285f4] rounded-md flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg">Misión</h3>
              <p className="text-gray-600">
                 Brindar apoyo integral a los cuidadores de pacientes con Alzheimer a través de una plataforma innovadora que ofrece información, orientación y herramientas prácticas.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Visión</h3>
              <p className="text-gray-600">
                Ser la plataforma líder en Latinoamérica en el apoyo a cuidadores de pacientes con Alzheimer, proporcionando soluciones tecnológicas avanzadas y una red de apoyo sólida. 
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Empresa</h3>
              <p className="text-gray-600">
                Como organización esperamos generar un impacto positivo en la vida de miles de cuidadores, promoviendo el reconocimiento de su laboro.
              </p>
            </div>
            </div>
            </div>

        {/* Bloque inferior de estadísticas */}
        <div className="mt-16 bg-[#6a2db9] text-white py-10 rounded-lg shadow-lg">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
            <div>
              <p className="text-3xl font-bold"><Counter end={55} /></p>
              <p className="mt-1 text-lg">Millones Personas con Alzheimer</p>
            </div>
            <div>
              <p className="text-3xl font-bold"><Counter end={66} /></p>
              <p className="mt-1 text-lg">% son Cuidadores Familiares</p>
            </div>
            <div>
              <p className="text-3xl font-bold"><Counter end={60} /></p>
              <p className="mt-1 text-lg">Edad vulnerable promedio</p>
            </div>
            <div>
              <p className="text-3xl font-bold"><Counter end={100} /></p>
              <p className="mt-1 text-lg">Objetivo Impactar a Familias</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de suscripción */}
      <section  id="suscripcion" className=" scroll-mt-24 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl !font-bold !text-[#5F16BF] mb-10 pb-8">
            ACCEDE AL PLAN QUE TENEMOS PARA TI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-18">
            {/* Plan Gratuito */}
            <div className="bg-white rounded-xl shadow-md p-6 border">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Free</h3>
              <p className="text-4xl font-bold text-[#7c17ff] mb-4">Gratis</p>
              <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                <li>✅ 2 tickets gratuitos</li>
                <li>✅ Acceso a la plataforma de comunidad </li>
                <li>✅ Publica y comenta en nuestra plataforma </li>
              </ul>
              <button className="bg-gray-300 text-gray-800 font-semibold   mb-4  px-6 py-2 rounded hover:bg-gray-400 transition">
                Empezar Gratis
              </button>
            </div>

            {/* Plan Premium 1 mes */}
            <div className="bg-white rounded-xl shadow-md p-6 border">
              <h3 className="text-xl font-semibold text-[#6f3aff] mb-2">Premium / 1 mes</h3>
              <p className="line-through text-gray-400 text-sm">S/.14.99</p>
              <p className="text-4xl font-bold text-[#5902c3] mb-2">S/.9.99<span className="text-base font-medium">/mes</span></p>
              <p className="text-sm text-gray-600 mb-4">Aprende de varios temas en la semana</p>
              <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                <li>✅ Varios Tickets para Zoom</li>
                <li>✅ Selecciona clases de varios temas en un día</li>
                <li>✅ Acceso a clases con todos los docentes</li>
                <li>✅ Disfruta de participar en la comunidad</li>
              </ul>
              <button className="bg-[#9567ff] text-white font-semibold px-6 py-2 rounded hover:bg-[#6e23f9] transition">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </section>

        {/* Sección de docente */}

      <section id="docente" className=" scroll-mt-24 flex flex-col md:flex-row items-center justify-between bg-white py-12 px-6 md:px-16">
        {/* Texto a la izquierda */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl !font-bold !text-[#5008c2] mb-10 px-12 ">
            ¿Quieres ser parte de nuestra red de docentes?
          </h2>
          <p className="text-lg text-gray-600 mb-12 px-12 !mt-6">
            En nuestra red de docentes crece tu marca persona como profesional, contactando con personas que necesitan tu ayuda y teniendo tu publico en esta comunidad.
          </p>
          <div className="px-12 !mt-6">
            <button className="bg-[#8a42ff] text-white px-6 py-2 !rounded-xl text-lg hover:bg-[#6136ff] transition-colors duration-300 mb-4">
              Comunicarte con Alzhivida
            </button>
          </div>
        </div>

        {/* Imagen a la derecha */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={imagenDocente}
            alt="Docente conversando en línea"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* Sección de preguntas */}
       
      <section id="preguntas" className=" scroll-mt-24 bg-gradient-to-r from-[#835ec0] via-[#8d68e9de] to-[#5f4ec4] py-16 px-6 sm:px-12">
        <h2 className="text-4xl !font-bold text-center mb-8 text-white ">Preguntas Frecuentes</h2>

        <div className="space-y-5 max-w-3xl mx-auto">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="mt-8 bg-white rounded-2xl shadow-xl transition-all duration-300 border border-gray-40"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg !font-medium text-gray-700 group-hover:text-[#000000] transition-colors duration-200">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-[#6b4eff]" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-100">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección de contacto */}

      <footer  id="contacto" className="bg-gray-100 text-black py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Logo + nombre */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <img src={logoAlzhivida} alt="Logo" className="w-[70px] h-auto" />
              <span className="text-2xl font-bold text-[#5F16BF]">Alzhivida</span>
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Contacto</h4>
            <p className="text-sm">📞 +51 987 654 321</p>
            <p className="text-sm">📧 alzhivida@gmail.com</p>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Síguenos</h4>
            <ul className="mb-4 text-sm">
              <li><a href="#" className="mt-4 !no-underline text-black hover:text-[#5F16BF] transition-colors">Facebook</a></li>
              <li><a href="#" className="mt-4 !no-underline text-black hover:text-[#5F16BF] transition-colors">Instagram</a></li>
              <li><a href="#" className="mt-4 !no-underline text-black hover:text-[#5F16BF] transition-colors">LinkedIn</a></li>
            </ul>
          </div>

          {/* Columna 4: Enlaces legales */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Enlaces</h4>
            <ul className="mb-4 text-sm">
              <li><a href="#" className="mt-4 !no-underline text-black hover:text-[#5F16BF] transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="mt-4 !no-underline text-black hover:text-[#5F16BF] transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="mt-4 !no-underline text-black hover:text-[#5F16BF] transition-colors">Libro de Reclamaciones</a></li>
            </ul>
          </div>

        </div>
      </footer>


    </div>
  );
}

export default Home;
