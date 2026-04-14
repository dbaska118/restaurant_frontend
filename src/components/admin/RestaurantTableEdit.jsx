import Menu from "../Menu.jsx";
import {toast, ToastContainer} from "react-toastify";
import {Ban, NotebookPen, Trash} from "lucide-react";
import React, {useEffect} from "react";
import {getPossibleNumberOfChairs} from "../../api/tablePriceAPI.js";
import {createRestaurantTable, getAllRestaurantTable, deleteRestaurantTable, updateRestaurantTable} from "../../api/restaurantTableAPI.js";

function RestaurantTableEdit() {
    const [possibleNumberOfChairs, setPossibleNumberOfChairs] = React.useState([])
    const [formData, setFormData] = React.useState({
        name: "",
        numberOfChairs: undefined,
    });
    const [restaurantTable, setRestaurantTable] = React.useState([])
    const [editMode, setEditMode] = React.useState(false);

    useEffect(() => {
        getPossibleNumberOfChairs()
            .then((response) => {
                setPossibleNumberOfChairs(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        getAllRestaurantTable()
            .then((response) => {
                setRestaurantTable(response);
            })
        .catch((error) => {
            console.log(error);
        })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.numberOfChairs === undefined) {
            toast.error('Przed dodaniem stolików wymagane jest stworzenie wpisu w cenniku rezerwacji!', {
                className: 'min-w-[450px]',
            });
            return;
        }
        if(editMode) {
            try {
                const response = await updateRestaurantTable(formData.id, formData);
                toast.success('Edytowano stolik!', {
                    className: 'min-w-[450px]',
                });
                setRestaurantTable((prevState => prevState.map(item => item.id === response.id ? response : item)))
                setEditMode(false);
                setFormData({
                    name: "",
                    numberOfChairs: possibleNumberOfChairs[0],
                })
            }
            catch (error) {
                console.error(error);
                if(error.status === 400) {
                    toast.error('Wpis w cenniku rezerwacji dla podanej liczby miejsc nie istnieje!', {
                        className: 'min-w-[450px]',
                    });
                }
                else {
                    toast.error('Błąd edycji stolika!', {
                        className: 'min-w-[450px]',
                    });
                }
            }
        }
        else {
            try {
                const response = await createRestaurantTable(formData);
                setRestaurantTable((prevState => [...prevState, response]));
                toast.success('Dodano nowy stolik!', {
                    className: 'min-w-[450px]',
                });
                setFormData({
                    name: "",
                    numberOfChairs: possibleNumberOfChairs[0],
                })
            }
            catch (error) {
                console.log(error);
                if(error.status === 400) {
                    toast.error('Wpis w cenniku rezerwacji dla podanej liczby miejsc nie istnieje!', {
                        className: 'min-w-[450px]',
                    });
                }
                else {
                    toast.error('Błąd dodania nowego stolika!', {
                        className: 'min-w-[450px]',
                    });
                }
            }
        }
    }

    const cancelEdit = () => {
        setEditMode(false);
        setFormData({
            name: "",
            numberOfChairs: possibleNumberOfChairs[0],
        })
    }

    const handleEdit = (table) => {
        setEditMode(true);
        setFormData(table);
    }

    const handleDelete = async (table) => {
        try {
            const response = await deleteRestaurantTable(table.id);
            setRestaurantTable(prevState => prevState.filter(restaurant => restaurant.id !== response.id));
            toast.success('Usunięto stolik!', {
                className: 'min-w-[450px]',
            });
        }
        catch (error) {
            console.log(error);
            toast.error('Błąd usunięcia stolika!', {
                className: 'min-w-[450px]',
            });
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className="relative w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                        <h1 className="text-4xl font-semibold text-center mb-5">Cennik rezerwacji</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label>Nazwa:</label>
                                        <input
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                            type="text"
                                            name="name"
                                            placeholder="Nazwa stolika"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                </div>
                                <div className="flex flex-col">
                                    <label>Ilość miejsc:</label>
                                    <select value={formData.numberOfChairs}
                                            onChange={(e) => setFormData({...formData, numberOfChairs: Number(e.target.value)})}
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                    >
                                        {possibleNumberOfChairs.length === 0 && (
                                            <option value={undefined}>Brak wpisów w cenniku</option>
                                        )}
                                        {possibleNumberOfChairs.map(number => (
                                            <option key={number} value={number}>{number}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    {editMode && (
                                        <div className="flex gap-10 w-full">
                                            <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Edytuj stolik</button>
                                            <button onClick={() => cancelEdit()}  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anuluj</button>
                                        </div>
                                    )}
                                    {!editMode && (
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj stolik</button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        {restaurantTable.length === 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <Ban className="w-44 h-44 mb-10"/>
                                <h1 className="text-4xl font-semibold">Nie dodano jeszcze żadnych stolików!</h1>
                            </div>
                        )}
                        {restaurantTable.length > 0 && (
                            <div>
                                <h1 className="text-4xl font-semibold text-center">Stoliki</h1>
                                {restaurantTable
                                    .sort((a, b) => {
                                        if (a.numberOfChairs !== b.numberOfChairs) {
                                            return a.numberOfChairs - b.numberOfChairs;
                                        }
                                        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
                                    })
                                    .map(table => (
                                    <div key={table.id} className="flex flex-col border-b-1 pt-2 pb-4 mb-8 border-gray-600">
                                        <div className="flex justify-between ">
                                            <h3 className="text-3xl font-semibold text-logotext">{table.name} - miejsca: {table.numberOfChairs}</h3>
                                            <div className="flex gap-4">
                                                <button onClick={() => handleEdit(table)} className="cursor-pointer flex items-center gap-1 text-green-500 hover:text-green-700"> <NotebookPen /> Edytuj</button>
                                                <button onClick={() => handleDelete(table)} className="cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-700"> <Trash/> Usuń</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantTableEdit;