import {useAuth} from "../AuthContext.jsx";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import Menu from "./Menu.jsx";
import {changePassword} from "../api/userAPI.js";

function ChangePassword() {
    const {user } = useAuth()
    const [formData, setFormData] = React.useState({
        email: user.email,
        oldPassword: "",
        newPassword: "",
    })
    const [newPasswordRepeat, setNewPasswordRepeat] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.oldPassword === formData.newPassword) {
            toast.error("Podane nowe i stare hasła są identyczne!", {
                className: 'min-w-[450px]',
            });
        }
        else if(formData.newPassword !== newPasswordRepeat) {
            toast.error("Podane nowe hasła nie są identyczne!", {
                className: 'min-w-[450px]',
            });
        }
        else {
            try {
                await changePassword(formData);
                toast.success("Hasło zostało zmienione!", {
                    className: 'min-w-[450px]',
                });
            }
            catch (error) {
                if(error.status === 400) {
                    toast.error("Podane błędne aktualne hasło!", {
                        className: 'min-w-[450px]',
                    });
                }
                else if(error.status === 404) {
                    toast.error("Nie znaleziono użytkownika!", {
                        className: 'min-w-[450px]',
                    });
                }
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="min-h-screen flex flex-col">
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center items-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <form className="w-full max-w-[750px]" onSubmit={handleSubmit}>
                    <div className="relative z-10 bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        <h1 className="text-4xl font-semibold text-center text-logotext mb-6">Zmiana hasła</h1>
                        <label>Stare hasło:</label>
                        <input
                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-8 outline-none focus:border-logotexthover"
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="************"
                        />
                        <label>Nowe hasło:</label>
                        <input
                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-8 outline-none focus:border-logotexthover"
                            type="password"
                            name="newPassword"
                            placeholder="************"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <label>Powtórz nowe hasło:</label>
                        <input
                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-12 outline-none focus:border-logotexthover"
                            type="password"
                            name="newPasswordRepeat"
                            placeholder="************"
                            value={newPasswordRepeat}
                            onChange={(e) => setNewPasswordRepeat(e.target.value)}
                        />
                        <button type="submit"  className="border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Zmień hasło</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword