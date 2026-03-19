import React from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const [registerData, setRegisterData] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        type: "client"
    })
    const navigate = useNavigate();

    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    }

    const sendRegisterData = (e) => {
        e.preventDefault();
        console.log(registerData);
        setRegisterData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            type: "client"
        })
    }

    return (
        <div className="relative w-full h-screen flex items-center justify-center">

            <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
            <form className="w-full max-w-[750px]" onSubmit={sendRegisterData}>
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
                        value={registerData.email}
                        onChange={handleChange}
                    />
                    <label>Hasło:</label>
                    <input
                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-4 outline-none focus:border-logotexthover"
                        type="password"
                        name="password"
                        placeholder="************"
                        value={registerData.password}
                        onChange={handleChange}
                    />
                    <label>Imię:</label>
                    <input
                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-4 outline-none focus:border-logotexthover"
                        type="text"
                        name="firstName"
                        placeholder="Imię"
                        value={registerData.firstName}
                        onChange={handleChange}
                    />
                    <label>Nazwisko:</label>
                    <input
                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-10 outline-none focus:border-logotexthover"
                        type="text"
                        name="lastName"
                        placeholder="Nazwisko"
                        value={registerData.lastName}
                        onChange={handleChange}
                    />
                    <button type="submit"  className="border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Stwórz konto</button>
                    <div className="flex gap-2 justify-center mt-8">
                        <p>Masz już konto?</p>
                        <button
                            className="text-logotext hover:text-logotexthover hover:cursor-pointer  hover:underline underline-offset-8"
                            type="button" onClick={() => navigateToPage("/login")}>Zaloguj się</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;