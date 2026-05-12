import Menu from "./Menu.jsx";
import Footer from "./Footer.jsx";
import {useLocation} from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();
    const noLayoutRoutes = ['/login', '/register'];


    return (
        <div className="flex flex-col min-h-screen">
            {!noLayoutRoutes.includes(location.pathname) && <Menu/>}
            <main className="flex-grow">
                {children}
            </main>
            {!noLayoutRoutes.includes(location.pathname) && <Footer/>}
        </div>
    )
}

export default Layout;