import {ToastContainer} from "react-toastify";
import Menu from "./Menu.jsx";
import React, {useEffect} from "react";
import Footer from "./Footer.jsx";
import {getAllTablePrice} from "../api/tablePriceAPI.js";
import { Users } from "lucide-react";

function Reservations() {
    const [tablePriceList, setTablePriceList] = React.useState([]);
    const [findFreeTables, setFreeTables] = React.useState({
        minNumberOfChairs: 0,
    });

    useEffect(() => {
        getAllTablePrice()
            .then(response => {
                console.log(response);
                setTablePriceList(response);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    return (
        <div>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="mx-10 mt-56">
                <div className="h-[30vh] w-full bg-[url('/table-dinner-set.jpg')] bg-fixed bg-center bg-cover relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h2 className="relative z-10 text-white text-8xl font-serif tracking-widest">
                        REZERWACJE
                    </h2>
                </div>
                <div>
                    <h1 className="text-4xl text-logotext text-center mt-10 mb-8 font-serif">CENNIK REZERWACJI</h1>
                    <div className="grid grid-cols-3 gap-16 mx-auto w-3/4 mb-10">
                        {tablePriceList.map((price) => (
                            <button key={price.id}
                                    className="border border-footertext bg-amber-50 shadow-xl rounded-lg p-5 flex flex-col justify-center items-center group
                                    hover:cursor-pointer
                                    ">
                                <h2 className="text-3xl text-logotext">Stolik {price.numberOfChairs}-osobowy</h2>
                                <p className="text-gray-500 text-lg mb-5">Idealny na {price.numberOfChairs === 1 ? 'spokojny wieczór' : price.numberOfChairs <= 2 ? 'romantyczną kolację' : 'spotkanie z przyjaciółmi'}</p>
                                <h3 className="text-3xl font-semibold text-logotexthover">{price.price} zł</h3>
                                <p className="text-gray-500 text-lg mb-3">Koszt rezerwacji</p>
                                <p className="opacity-0 group-hover:opacity-100">Wybierz</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservations;