import React, {useEffect} from "react";
import Menu from "./Menu.jsx";

function MainPage(){

    return (
        <div>
            <Menu/>
            <img src="/restaurant-interior.jpg" alt="Logo Pałac Smaku" className="w-full h-auto"/>
        </div>
    )
}

export default MainPage;