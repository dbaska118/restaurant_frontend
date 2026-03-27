import {toast, ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import Menu from "./Menu.jsx";
import {changeName, getName} from "../api/userAPI.js";
import {useAuth} from "../AuthContext.jsx";

function ChangeName() {
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
    })
    const {user} = useAuth()



    useEffect(() => {
        getName(user.email)
            .then((response) => {
                console.log(response)
               setFormData(response);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [user.email])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await changeName({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: user.email,
            });
            toast.success("Dane zostały zmienione!", {
                className: 'min-w-[450px]',
            });
        } catch (error) {
            if(error.status === 400) {
                toast.success("Próba zmiany danych innego użytkownika!", {
                    className: 'min-w-[450px]',
                });
            }
            else if(error.status === 404) {
                toast.success("Nie znaleziono użytkownika!", {
                    className: 'min-w-[450px]',
                });
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center items-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <form className="w-full max-w-[750px]" onSubmit={handleSubmit}>
                    <div className="relative z-10 bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        <h1 className="text-4xl font-semibold text-center text-logotext mb-6">Zmiana danych</h1>
                        <label>Imię:</label>
                        <input
                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-8 outline-none focus:border-logotexthover"
                            type="text"
                            name="firstName"
                            placeholder="Imię"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}

                        />
                        <label>Nazwisko:</label>
                        <input
                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-12 outline-none focus:border-logotexthover"
                            type="text"
                            name="lastName"
                            placeholder="Nazwisko"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                        <button type="submit"  className="border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Zmień dane</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeName;