import {ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllTablePrice} from "../api/tablePriceAPI.js";
import {getAllOpeningHours} from "../api/openingHoursAPI.js";
import {findAllFreeRestuarantTables} from "../api/reservationAPI.js";
import {Ban} from "lucide-react";


function Reservations() {
    const [tablePriceList, setTablePriceList] = React.useState([]);
    const [findFreeTables, setFindFreeTables] = React.useState({
        minNumberOfChairs: 0,
        reservationDay: 0,
        reservationStartTime: "",
        reservationLength: 2,

    });
    const [findMode, setFindMode] = React.useState(false);
    const [openHours, setOpenHours] = React.useState([]);
    const [reservationHours, setReservationHours] = React.useState([]);
    const [reservationLengths, setReservationLengths] = React.useState([]);
    const [freeTables, setFreeTables] = React.useState(null);

    useEffect(() => {
        getAllTablePrice()
            .then(response => {
                setTablePriceList(response);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    useEffect(() => {
        getAllOpeningHours()
            .then(result => {
               setOpenHours(result);
            })
            .catch(error => {
                console.log(error);
            })
    },[])


    useEffect(() => {
        if (!openHours.length || !findFreeTables.reservationDay) return;


        const selectedDay = new Date(findFreeTables.reservationDay);
        const dayIndex = selectedDay.getDay() === 0 ? 7 : selectedDay.getDay();
        const openDay = openHours.find(day => day.dayOrder === dayIndex);

        if (!openDay) return;

        const openHour = parseInt(openDay.openTime.split(':')[0]);
        const closeHour = parseInt(openDay.closeTime.split(':')[0]);
        const timeSlots = [];
        const interval = 2;
        for (let hour = openHour; hour < closeHour; hour += interval) {
            if (hour + interval > closeHour) break;
            const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
            timeSlots.push(formattedHour);
        }
        setReservationHours(timeSlots);


        let currentStartTime = findFreeTables.reservationStartTime;
        if (!timeSlots.includes(currentStartTime) && timeSlots.length > 0) {
            currentStartTime = timeSlots[0];
        }


        const currentStartHour = parseInt(currentStartTime.split(':')[0]);
        const hoursLeft = closeHour - currentStartHour;

        const basicLength = [2, 4, 6, 8];
        const filteredLengths = basicLength.filter(length => length <= hoursLeft);
        setReservationLengths(filteredLengths);

        setFindFreeTables(prev => {
            let nextLength = prev.reservationLength;
            if (!filteredLengths.includes(Number(nextLength))) {
                nextLength = filteredLengths.length > 0 ? Math.min(...filteredLengths) : 2;
            }
            return {
                ...prev,
                reservationStartTime: currentStartTime,
                reservationLength: Number(nextLength)
            };
        });

    }, [findFreeTables.reservationDay, findFreeTables.reservationStartTime, openHours]);

    const openFindModeCard = (price) => {
        const numberOfChairs = Number(price.numberOfChairs);
        openFindMode(numberOfChairs)
    }

    const openFindModeButton = () => {
        const numberOfChairs = Math.min(...tablePriceList.map(item => item.numberOfChairs));
        openFindMode(numberOfChairs);
    }

    const openFindMode = (chairs) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayIndex = tomorrow.getDay() === 0 ? 7 : tomorrow.getDay();
        const openDay = openHours.find(day => day.dayOrder === dayIndex);
        const cleanStartTime = openDay ? openDay.openTime.substring(0, 5) : "12:00";

        if (findMode) {
            setFindFreeTables({
                ...findFreeTables,
                minNumberOfChairs: chairs
            })
        }
        else {
            setFindMode(true);
            setFindFreeTables({
                ...findFreeTables,
                minNumberOfChairs: chairs,
                reservationStartTime: cleanStartTime,
                reservationDay: tomorrow.toISOString().split('T')[0]
            })
        }
    }

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const findFreeRestaurantTables = async (e) => {
        e.preventDefault();
        const sendData = {
            ...findFreeTables,
            reservationStartTime: findFreeTables.reservationStartTime + ':00',
        }
        try {
            const response = await findAllFreeRestuarantTables(sendData);
            setFreeTables(response);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    const renderTableCars = (resTable) =>{
        const basePrice = tablePriceList.find(p => p.numberOfChairs === resTable.numberOfChairs).price;
        const finalPrice = (basePrice / 2) * tablePriceList.length;
        const isGreater = resTable.numberOfChairs > findFreeTables.minNumberOfChairs;

        return (
            <div className="text-center" key={resTable.id}>
                <p>{resTable.name}</p>
                <p>{new Date(freeTables.startTime).toLocaleString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                    {" - "}
                    {new Date(freeTables.endTime).toLocaleString('pl-PL', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
                <p>Liczba miejsc: {resTable.numberOfChairs}</p>
                <p>Cena: <span className={`${isGreater ? 'text-red-600 ' : 'text-gray-800'}`}> {finalPrice}</span></p>
                <button>Zarezerwuj</button>
            </div>
        )
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
                    <div className="text-xl mx-auto w-3/4 my-16 border-2 border-logotext rounded-2xl py-4 px-8 bg-amber25">
                        <h1 className="text-4xl text-logotext text-center mt-10 mb-4 font-serif">WYSZUKIWARKA TERMINÓW</h1>
                        <div className="grid grid-cols-4 gap-10">
                            <div className="flex flex-col">
                                <label className="text-xl text-logotext font-semibold text-center">Liczba krzeseł:</label>
                                <select
                                    className="border-2 border-logotext rounded-2xl p-3 text-lg mt-1 mb-4 outline-none focus:border-logotexthover bg-white"
                                    value={findFreeTables.minNumberOfChairs} onChange={(e) => setFindFreeTables({...findFreeTables, minNumberOfChairs: Number(e.target.value)})}>
                                    {tablePriceList.map(item => (
                                        <option className="text-center" key={item.id} value={item.numberOfChairs}>{item.numberOfChairs}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl text-logotext font-semibold text-center">Dzień rezerwacji:</label>
                                <input
                                    className="border-2 border-logotext rounded-2xl p-3 text-lg mt-1 mb-4 outline-none focus:border-logotexthover text-center bg-white"
                                    type="date"
                                    value={findFreeTables.reservationDay}
                                    min={getTomorrowDate()}
                                    onChange={(e) => setFindFreeTables({...findFreeTables, reservationDay: e.target.value})}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl text-logotext font-semibold text-center">Godzina rozpoczęcia:</label>
                                <select
                                    className="border-2 border-logotext rounded-2xl p-3 text-lg mt-1 mb-4 outline-none focus:border-logotexthover bg-white"
                                    value={findFreeTables.reservationStartTime}
                                    onChange={(e) => setFindFreeTables({...findFreeTables, reservationStartTime: e.target.value})}>
                                    {reservationHours.map(hour => (
                                        <option className="text-center" key={hour} value={hour}>{hour}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl text-logotext font-semibold text-center">Czas trwania rezerwacji:</label>
                                <select
                                    className="border-2 border-logotext rounded-2xl p-3 text-lg mt-1 mb-4 outline-none focus:border-logotexthover bg-white"
                                    value={findFreeTables.reservationLength}
                                    onChange={(e) => setFindFreeTables({...findFreeTables, reservationLength: Number(e.target.value)})}>
                                    {reservationLengths.map(hours => (
                                        <option className="text-center" key={hours} value={hours}>{hours}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="w-1/3 bg-white tracking-wide px-10 py-4 border-2 border-logotext text-logotext text-xl rounded-2xl hover:bg-logotext hover:text-white  cursor-pointer font-semibold"
                                    onClick={findFreeRestaurantTables}>
                                Wyszukaj wolne stoliki
                            </button>
                        </div>
                        {freeTables && (
                            <div className="text-xl mx-auto my-16 py-4 px-8">
                                <h1 className="text-4xl text-logotext text-center mt-10 mb-4 font-serif">DOSTĘPNE STOLIKI W WYBRANYM TERMINIE</h1>
                                {freeTables.exactTables.length === 0 && (
                                    <div className="flex flex-col items-center justify-center mt-6">
                                        <Ban className="w-20 h-20 mb-5"/>
                                        <h1 className="text-3xl font-semibold mb-4">Nie znaleziono stolików w podanym terminie!</h1>
                                    </div>
                                )}
                                {freeTables.exactTables.length > 0 && (
                                    <div className="grid grid-cols-3 gap-16 mx-auto w-3/4 mb-10">
                                        {freeTables.exactTables.map((resTable) => renderTableCars(resTable))}
                                    </div>
                                )}
                                <h1 className="text-4xl text-logotext text-center mt-20 mb-4 font-serif">WCZEŚNIEJSZE TERMINY</h1>
                                {freeTables.earlierTables.length === 0 && (
                                    <div className="flex flex-col items-center justify-center mt-6">
                                        <Ban className="w-20 h-20 mb-5"/>
                                        <h1 className="text-3xl font-semibold mb-4">Nie znaleziono stolików w podanym terminie!</h1>
                                    </div>
                                )}
                                {freeTables.earlierTables.length > 0 && (
                                    <div className="grid grid-cols-3 gap-16 mx-auto w-3/4 mb-10">
                                        {freeTables.earlierTables.map((resTable) => renderTableCars(resTable))}
                                    </div>
                                )}
                                <h1 className="text-4xl text-logotext text-center mt-20 mb-4 font-serif">PÓŹNIEJSZE TERMINY</h1>
                                {freeTables.laterTables.length === 0 && (
                                    <div className="flex flex-col items-center justify-center mt-6">
                                        <Ban className="w-20 h-20 mb-5"/>
                                        <h1 className="text-3xl font-semibold mb-4">Nie znaleziono stolików w podanym terminie!</h1>
                                    </div>
                                )}
                                {freeTables.laterTables.length > 0 && (
                                    <div className="grid grid-cols-3 gap-16 mx-auto w-3/4 mb-10">
                                        {freeTables.laterTables.map((resTable) => renderTableCars(resTable))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <h1 className="text-4xl text-logotext text-center mt-10 mb-4 font-serif">CENNIK REZERWACJI</h1>
                    {!findMode && (
                        <div className="flex flex-col items-center pb-2 mb-8">
                            <p className="text-2xl text-gray-600 mb-4 italic">Chcesz sprawdzić dostępność?</p>
                            <button
                                onClick={openFindModeButton}
                                className="tracking-wide px-10 py-4 border-2 border-logotext text-logotext text-xl rounded-2xl hover:bg-logotext hover:text-white  cursor-pointer font-semibold">
                                Otwórz wyszukiwarkę terminów
                            </button>
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-16 mx-auto w-3/4 mb-10">
                        {tablePriceList.map((price) => (
                            <button key={price.id}
                                    className="border border-footertext bg-amber-50 shadow-xl rounded-2xl p-5 flex flex-col justify-center items-center group
                                    hover:cursor-pointer hover:border-logotext hover:shadow-2xl hover:scale-105 hover:bg-amber25"
                                    onClick={() => openFindModeCard(price)}

                            >
                                <h2 className="text-3xl text-logotext group-hover:text-logotexthover">Stolik {price.numberOfChairs}-osobowy</h2>
                                <p className="text-gray-700 group-hover:text-gray-600 text-lg mb-5">Idealny na {price.numberOfChairs === 1 ? 'spokojny wieczór' : price.numberOfChairs <= 2 ? 'romantyczną kolację' : 'spotkanie z przyjaciółmi'}</p>
                                <h3 className="text-3xl font-semibold text-logotext group-hover:text-logotexthover">{price.price} zł / 2h</h3>
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