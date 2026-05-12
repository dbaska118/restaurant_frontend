import Menu from "../Menu.jsx";
import {toast, ToastContainer} from "react-toastify";
import {createTablePrice, deleteTablePrice, getAllTablePrice, updateTablePrice} from "../../api/tablePriceAPI.js";
import React, {useEffect} from "react";
import {Ban, NotebookPen, Trash} from "lucide-react";

function TablePriceEdit() {
    const [formData, setFormData] = React.useState({
        numberOfChairs: 1,
        price: 10
    });
    const [tablePrice, setTablePrice] = React.useState([])
    const [editMode, setEditMode] = React.useState(false);

    useEffect(() => {
        getAllTablePrice()
            .then((response) => {
                setTablePrice(response);
            })
            .catch((error) => {
                console.log(error)
            })
    },[])

    const cancelEdit = () => {
        setEditMode(false);
        setFormData({
            numberOfChairs: 1,
            price: 10
        })
    }

    const handleEdit = (table) => {
        setEditMode(true);
        setFormData(table)
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const handleDelete = async (table) => {
        try {
            const response = await deleteTablePrice(table.numberOfChairs);
            setTablePrice(prevState => prevState.filter(item => item.id !== response.id));
            toast.success("Usunięto wpis w cenniku rezerwacji!", {
                className: 'min-w-[450px]',
            });

        }
        catch (error) {
            console.log(error);
            if(error.status === 409) {
                toast.error("Istnieją stoliki przypisane do tego wpisu!", {
                    className: 'min-w-[450px]',
                });
            }
            else {
                toast.error("Błąd usunięcia wpisu w cenniku rezerwacji!", {
                    className: 'min-w-[450px]',
                });
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editMode){
            try {
                const response = await updateTablePrice(formData.numberOfChairs, formData);
                setTablePrice(prevState => prevState.map(item => item.id === response.id ? response : item));
                toast.success("Edytowano wpis w cenniku rezerwacji!", {
                    className: 'min-w-[450px]',
                });
                setEditMode(false);
                setFormData({
                    numberOfChairs: 1,
                    price: 10
                })
            }
            catch (error) {
                console.log(error);
                toast.error("Błąd edycji wpisu w cenniku rezerwacji!", {
                    className: 'min-w-[450px]',
                });
            }
        }
        else {
            try {
                const response = await createTablePrice(formData);
                setTablePrice((prevState => [...prevState, response]));
                toast.success("Dodano wpis w cenniku rezerwacji!", {
                    className: 'min-w-[450px]',
                });
                setFormData({
                    numberOfChairs: 1,
                    price: 10
                })
            }
            catch (error) {
                console.log(error);
                if(error.status === 409) {
                    toast.error("Istnieje wpis dotyczący wprowadzonej liczby miejsc!", {
                        className: 'min-w-[450px]',
                    });
                }
                else {
                    toast.error("Błąd dodania wpisu w cenniku rezerwacji!", {
                        className: 'min-w-[450px]',
                    });
                }
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className="relative w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                        <h1 className="text-4xl font-semibold text-center mb-5">Cennik rezerwacji</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label>Ilość miejsc:</label>
                                    {editMode && (
                                        <input
                                            className="border-2 border-gray-600 rounded-xl p-3 text-xl mt-1 mb-2 outline-none text-gray-600"
                                            type="number"
                                            name="numberOfChairs"
                                            min="1"
                                            value={formData.numberOfChairs}
                                            readOnly={true}
                                        />
                                    )}
                                    {!editMode && (
                                        <input
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                            type="number"
                                            name="numberOfChairs"
                                            min="1"
                                            value={formData.numberOfChairs}
                                            onChange={(e) => setFormData({...formData, numberOfChairs: Number(e.target.value)})}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <label>Cena:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="number"
                                        name="price"
                                        step="0.01"
                                        min="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                    />
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    {editMode && (
                                        <div className="flex gap-10 w-full">
                                            <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Edytuj wpis</button>
                                            <button onClick={() => cancelEdit()}  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anuluj</button>
                                        </div>
                                    )}
                                    {!editMode && (
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj wpis w cenniku</button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        {tablePrice.length === 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <Ban className="w-44 h-44 mb-10"/>
                                <h1 className="text-4xl font-semibold">Brak wpisów w cenniku!</h1>
                            </div>
                        )}
                        {tablePrice.length > 0 && (
                            <div>
                                <h1 className="text-4xl font-semibold text-center mb-8">Ceny rezerwacji stolików</h1>
                                {tablePrice
                                    .sort((a, b) => a.numberOfChairs - b.numberOfChairs)
                                    .map((table) => (
                                    <div key={table.id} className="flex flex-col border-b-1 pt-2 pb-4 mb-8 border-gray-600">
                                        <div className="flex justify-between ">
                                            <h3 className="text-3xl font-semibold text-logotext">Stolik {table.numberOfChairs}-osobowy - {Number(table.price).toFixed(2)} zł</h3>
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

export default TablePriceEdit;