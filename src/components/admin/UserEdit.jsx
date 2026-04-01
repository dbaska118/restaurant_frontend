import Menu from "../Menu.jsx";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import {useAuth} from "../../AuthContext.jsx";
import {addUser, addAdmin} from "../../api/userAPI.js";

function UserEdit() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        type: "admin"
    })
    const {user} = useAuth()
    const [editMode, setEditMode] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editMode) {

        }
        else {
            if(formData.type === "admin") {
                try {
                    const response = await addAdmin(formData);
                    toast.success("Dodano konto administratora!", {
                        className: 'min-w-[450px]',
                    });
                } catch (error) {
                    console.log(error);
                    if(error.status === 409) {
                        toast.error("Istnieje już konto z takim adresem e-mail!", {
                            className: 'min-w-[450px]',
                        });
                    }
                    else {
                        toast.error("Błąd tworzenia konta administratora!", {
                            className: 'min-w-[450px]',
                        });
                    }
                    return;
                }
            }
            else {
                try {
                    const response = await addUser(formData);
                    toast.success("Dodano konto użytkownika!", {
                        className: 'min-w-[450px]',
                    });
                } catch (error) {
                    console.log(error);
                    if(error.status === 409) {
                        toast.error("Istnieje już konto z takim adresem e-mail!", {
                            className: 'min-w-[450px]',
                        });
                    }
                    else {
                        toast.error("Błąd tworzenia konta administratora!", {
                            className: 'min-w-[450px]',
                        });
                    }
                    return;
                }
            }
        }
        setFormData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            type: ""
        })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className="relative w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                        <h1 className="text-4xl font-semibold text-center mb-5">Zarządzanie użytkownikami</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label>Adres e-mail:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="text"
                                        name="email"
                                        placeholder="Adres e-mail"
                                        value={formData.email}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Haslo:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="password"
                                        name="password"
                                        placeholder="*********"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Imię:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="text"
                                        name="firstName"
                                        placeholder="Imię"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Nazwisko:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="text"
                                        name="lastName"
                                        placeholder="Nazwisko"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Rola:</label>
                                    <select
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        value={formData.type}
                                        onChange={handleChange}
                                        name="type"
                                    >
                                        <option value="client">Klient</option>
                                        <option value="employee">Pracownik</option>
                                        {user.role === "headAdmin" && (
                                            <option value="admin">Administrator</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    {editMode && (
                                        <div className="flex gap-10 w-full">
                                            <button type="submit"  className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Edytuj użytkownika</button>
                                            <button type="button" className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anuluj edycję</button>
                                        </div>
                                    )}
                                    {!editMode && (
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj użytkownika</button>
                                    )}

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEdit