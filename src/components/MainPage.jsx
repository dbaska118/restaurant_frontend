import Menu from "./Menu.jsx";
import Footer from "./Footer.jsx";

function MainPage(){

    return (
        <div>
            <Menu/>
            <img src="/restaurant-interior.jpg" alt="Logo Pałac Smaku" className="w-full h-auto"/>
            <img src="/restaurant-interior.jpg" alt="Logo Pałac Smaku" className="w-full h-auto"/>
            <Footer/>
        </div>
    )
}

export default MainPage;