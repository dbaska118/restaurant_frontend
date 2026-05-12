import {ToastContainer} from "react-toastify";
import Menu from "./Menu.jsx";
import React from "react";
import Footer from "./Footer.jsx";

function Reservations() {

    return (
        <div>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <Menu/>
            <div className="mx-10 mt-52 mb-16">
                <h1 className="text-center">Rezerwacje</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default Reservations;