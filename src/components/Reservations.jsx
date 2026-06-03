import {ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllTablePrice} from "../api/tablePriceAPI.js";


function Reservations() {
    const [tablePriceList, setTablePriceList] = React.useState([]);
    const [findFreeTables, setFindFreeTables] = React.useState({
        minNumberOfChairs: 0,
    });
    const [findMode, setFindMode] = React.useState(false);

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

    const openFindModeCard = (price) => {
        setFindFreeTables({...findFreeTables, minNumberOfChairs: price.numberOfChairs});
        setFindMode(true);
    }

    const openFindModeButton = () => {
        setFindMode(true);
    }

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
                {findMode && (
                    <div>
                        <p>{findFreeTables.minNumberOfChairs}</p>
                    </div>
                )}
                <div>
                    <h1 className="text-4xl text-logotext text-center mt-10 font-serif">CENNIK REZERWACJI</h1>
                    <div className="flex flex-col items-center py-2 mb-8">
                        <p className="text-2xl text-gray-600 mb-4 italic">Chcesz sprawdzić dostępność?</p>
                        <button
                            onClick={openFindModeButton}
                            className="tracking-wide px-10 py-4 border-2 border-logotext text-logotext text-xl rounded-2xl hover:bg-logotext hover:text-white  cursor-pointer font-semibold">
                            Otwórz wyszukiwarkę terminów
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-16 mx-auto w-3/4 mb-10">
                        {tablePriceList.map((price) => (
                            <button key={price.id}
                                    className="border border-footertext bg-amber-50 shadow-xl rounded-2xl p-5 flex flex-col justify-center items-center group
                                    hover:cursor-pointer hover:border-logotext hover:shadow-2xl hover:scale-105 hover:bg-amber25"
                                    onClick={() => openFindModeCard(price)}

                            >
                                <h2 className="text-3xl text-logotext group-hover:text-logotexthover">Stolik {price.numberOfChairs}-osobowy</h2>
                                <p className="text-gray-700 group-hover:text-gray-600 text-lg mb-5">Idealny na {price.numberOfChairs === 1 ? 'spokojny wieczór' : price.numberOfChairs <= 2 ? 'romantyczną kolację' : 'spotkanie z przyjaciółmi'}</p>
                                <h3 className="text-3xl font-semibold text-logotext group-hover:text-logotexthover">{price.price} zł</h3>
                                <p className="text-gray-700 group-hover:text-gray-600 text-lg mb-3">Koszt rezerwacji</p>
                                <p className="text-lg text-logotext opacity-0 underline underline-offset-8 group-hover:opacity-100">Wybierz</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservations;