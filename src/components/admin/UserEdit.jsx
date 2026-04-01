import Menu from "../Menu.jsx";
import {toast, ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {useAuth} from "../../AuthContext.jsx";
import {addUser, addAdmin, getUsers, getAllUsers, getName} from "../../api/userAPI.js";
import {Ban, NotebookPen, SearchCheck, Trash} from "lucide-react";


const UserSelection = ({users, title, search, handleDelete, handleEdit}) => {

    const filtered = users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase())
        || user.lastName.toLowerCase().includes(search.toLowerCase())
    );

    if(filtered.length === 0){
        return null;
    }

    let showUsers;
    if(search === ""){
        showUsers = [...filtered].reverse().slice(0, 3);
    } else {
        showUsers = [...filtered].reverse();
    }


    return (
        <div className="mt-16">
            <h1 className="text-4xl font-semibold text-center mb-5">{title}</h1>
            {showUsers.map(user => (
                <div key={user.id} className="flex justify-between items-center border-b-1 pb-4 mb-8 border-gray-600">
                    <div className="grid grid-cols-[350px_150px_450px] gap-5">
                        <p className="font-semibold text-logotext truncate">{user.email}</p>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                    </div>
                    <div className="flex gap-5">
                        <button onClick={() => handleEdit(user)} className="cursor-pointer flex items-center gap-1 text-green-500 hover:text-green-700"> <NotebookPen /> Edytuj</button>
                        <button onClick={() => handleDelete(user)} className="cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-700"> <Trash/> Usuń</button>
                    </div>
                </div>
            ))}
            { search === "" ?
                <p className="text-center">Wyświetlono pierwsze {showUsers.length < 3 ? showUsers.length : 3} z {filtered.length} wyników.</p>
                :  <p className="text-center">Znaleziono {filtered.length} pasujących użytkowników.</p>
            }
        </div>
    )
}

function UserEdit() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        type: "client"
    })
    const {user} = useAuth()
    const [editMode, setEditMode] = React.useState(false);
    const [clients, setClients] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [admins, setAdmins] = React.useState([]);
    const [search, setSearch] = React.useState("");

    useEffect(() => {
        console.log(user)
        if (!user?.role) return;

        if(user.role === "admin") {
            getUsers()
                .then((response) => {
                    setClients(response.filter((user) => user.role === "client"));
                    setEmployees(response.filter((user) => user.role === "employee"));
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else if(user.role === "headAdmin") {
            getAllUsers()
                .then((response) => {
                    setAdmins(response.filter((user) => user.role === "admin"));
                    setEmployees(response.filter((user) => user.role === "employee"));
                    setClients(response.filter((user) => user.role === "client"));
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user?.role])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleEdit = async (user) => {
        console.log("Edit", user)
    }

    const handleDelete = async (user) => {
        console.log("Delete", user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editMode) {

        }
        else {
            if(formData.type === "admin") {
                try {
                    const response = await addAdmin(formData);
                    setAdmins(prevState => [...prevState, response]);
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
                    if(response.type === "client") {
                        setClients(prevState => [...prevState, response]);
                    }
                    else if(response.type === "employee") {
                        setEmployees(prevState => [...prevState, response]);
                    }
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
            type: "client"
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
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        <div className="flex justify-center items-center gap-4 mt-5 mb-10" >
                            <SearchCheck className="w-12 h-12"/>
                            <input
                                className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover w-full"
                                type="text"
                                name="search"
                                placeholder="Wyfiltruj konta użytkowników po adresie e-mail lub nazwisku"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {(clients.length === 0 && employees.length === 0 && admins.length === 0) && (
                            <div className="flex flex-col items-center justify-center">
                                <Ban className="w-44 h-44 mb-10"/>
                                <h1 className="text-4xl font-semibold">Nie znaleziono kont użytkowników!</h1>
                            </div>
                        )}
                        {(clients.length > 0 || employees.length > 0 || admins.length > 0) && (
                            <div className="flex flex-col">
                                <UserSelection
                                    users={clients}
                                    title="Klienci"
                                    search={search}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                                <UserSelection
                                    users={employees}
                                    title="Pracownicy"
                                    search={search}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                                { user.role === "headAdmin" && (
                                    <UserSelection
                                        users={admins}
                                        title="Administratorzy"
                                        search={search}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEdit;