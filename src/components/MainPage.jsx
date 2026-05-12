import Menu from "./Menu.jsx";
import Footer from "./Footer.jsx";
import {ToastContainer} from "react-toastify";
import React from "react";

function MainPage(){

    return (
        <div>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <img src="/restaurant-interior.jpg" alt="Logo Pałac Smaku" className="w-full h-auto"/>
            <img src="/restaurant-interior.jpg" alt="Logo Pałac Smaku" className="w-full h-auto"/>
        </div>
    )
}

export default MainPage;