import React from "react";
import {useNavigate} from "react-router-dom";

function Menu() {
    const navigate = useNavigate();

    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    return (
        <div className="fixed top-0 left-0 z-50  w-full grid grid-cols-5 text-3xl font-serif text-logotext items-center justify-items-center bg-amber-50 h-36 shadow-md">
            <button onClick={() => navigateToPage("/dishes")} className="-mt-10 hover:text-logotexthover hover:underline hover:underline-offset-4 cursor-pointer">
                MENU
            </button>
            <button onClick={() => navigateToPage("/dishes")} className="-mt-10 hover:text-logotexthover hover:underline hover:underline-offset-4 cursor-pointer">
                REZERWACJE
            </button>
            <button onClick={() => navigateToPage("/")}>
                <img src="/logo2_gimp.png" alt="Logo Pałac Smaku" className="w-48 h-auto mt-3 cursor-pointer transition-all duration-300 scale-90 hover:scale-100 hover:brightness-105 hover:drop-shadow-2xl"/>
            </button>
            <button onClick={() => navigateToPage("/dishes")} className="-mt-10 hover:text-logotexthover hover:underline hover:underline-offset-4 cursor-pointer">
                KONTAKT
            </button>
            <button onClick={() => navigateToPage("/dishes")} className="-mt-10 transition-all duration-300 hover:text-logotexthover hover:underline hover:underline-offset-4 cursor-pointer">
                LOGOWANIE
            </button>

        </div>
    )
}

export default Menu;