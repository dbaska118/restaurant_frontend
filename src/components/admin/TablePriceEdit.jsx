import Menu from "../Menu.jsx";
import {toast, ToastContainer} from "react-toastify";
import {createTablePrice} from "../../api/tablePriceAPI.js";
import React from "react";

function TablePriceEdit() {
    const [formData, setFormData] = React.useState({
        numberOfChairs: 1,
        price: 10
    });
    const [tablePrice, setTablePrice] = React.useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();
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
                                    <label>Ilość miejsc:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="number"
                                        name="numberOfChairs"
                                        min="1"
                                        value={formData.numberOfChairs}
                                        onChange={(e) => setFormData({...formData, numberOfChairs: Number(e.target.value)})}
                                    />
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
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj wpis w cenniku</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TablePriceEdit;