import React from "react";
import { useState, useEffect } from "react";
import Header from "../layouts/Header";
import HeaderPrincipal from "../layouts/HeaderPrincipal";

function Principal(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#835ec0] via-[#8d68e9de] to-[#5f4ec4] flex flex-col items-center">  
            <HeaderPrincipal/>
            
        </div>
    )
}

export default Principal