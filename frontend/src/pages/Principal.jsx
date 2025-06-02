import React from "react";
import HeaderPrincipal from "../layouts/HeaderPrincipal";
import Modal from "../components/Modal";

function Principal() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#F2F4F7] via-[#F2F4F7] to-[#F2F4F7]">
      <HeaderPrincipal />
    
      {/* <section
        className="w-full h-[40vh] flex items-center text-left px-6 md:px-16"
      >
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Abrir Modal
        </button>

        


        <Modal id="exampleModal" />
      </section> */}

    </div>
  );
}

export default Principal;
