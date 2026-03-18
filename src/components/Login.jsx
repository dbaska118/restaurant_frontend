import React from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    }

    const sendLoginData = (e) => {
        e.preventDefault();
        console.log(loginData);
        setLoginData({
            email: "",
            password: "",
        })
    }

    return (
        <div className="relative w-full h-screen flex items-center justify-center">

            <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
            <form className="w-1/3" onSubmit={sendLoginData}>
                <div className="relative z-10 bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                    <div className="flex justify-center ">
                        <button type="button" onClick={() => navigateToPage("/")}>
                            <img src="/logo2_gimp.png" alt="Logo Pałac Smaku" className="w-48 mb-4 h-auto cursor-pointer transition-all duration-300 scale-90 hover:scale-100 hover:brightness-105 hover:drop-shadow-2xl"/>
                        </button>
                    </div>
                    <label>Adres e-mail:</label>
                    <input
                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-4 outline-none focus:border-logotexthover"
                        type="text"
                        name="email"
                        placeholder="Adres e-mail"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                    <label>Hasło:</label>
                    <input
                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-10 outline-none focus:border-logotexthover"
                        type="password"
                        name="password"
                        placeholder="************"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                    <button type="submit"  className="border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Zaloguj się</button>
                    <div className="flex gap-2 justify-center mt-8">
                        <p>Nie masz jeszcze konta?</p>
                        <button
                            className="text-logotext hover:text-logotexthover hover:cursor-pointer  hover:underline underline-offset-8"
                            type="button" onClick={() => navigateToPage("/register")}>Zarejestruj się</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login