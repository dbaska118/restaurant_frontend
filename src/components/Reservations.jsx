import {ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllTablePrice} from "../api/tablePriceAPI.js";
import {getAllOpeningHours} from "../api/openingHoursAPI.js";


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

    useEffect(() => {
        getAllOpeningHours()
            .then(result => {
               setOpenHours(result);
               console.log(result);
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

    // const calculateReservationStart = () => {
    //     const selectedDay = new Date(findFreeTables.reservationDay);
    //     const dayIndex = selectedDay.getDay() === 0 ? 7 : selectedDay.getDay();
    //     const openDay = openHours.find(day => day.dayOrder === dayIndex);
    //
    //     if(!openDay) {
    //         return;
    //     }
    //
    //
    //     const openHour = parseInt(openDay.openTime.split(':')[0]);
    //     const closeHour = parseInt(openDay.closeTime.split(':')[0]);
    //
    //     const timeSlots = []
    //     const interval = 2
    //     for (let hour = openHour; hour < closeHour; hour += interval) {
    //         if(hour + interval > closeHour) {
    //             break;
    //         }
    //         const formattedHour = hour < 10 ? '0' + hour + ':00' : hour + ":00";
    //         timeSlots.push(formattedHour)
    //     }
    //     setReservationHours(timeSlots);
    // }
    //
    // const calculateReservationLength = () => {
    //     const basicLength = [2,4,6,8]
    //     const selectedDay = new Date(findFreeTables.reservationDay);
    //     const dayIndex = selectedDay.getDay() === 0 ? 7 : selectedDay.getDay();
    //     const openDay = openHours.find(day => day.dayOrder === dayIndex);
    //
    //    if(!openDay || !findFreeTables.reservationDay || !findFreeTables.reservationStartTime) {
    //        setReservationLengths(basicLength)
    //        return
    //    }
    //
    //     const openHour = parseInt(findFreeTables.reservationStartTime.split(':')[0]);
    //     const closeHour = parseInt(openDay.closeTime.split(':')[0]);
    //     const hoursLeft = closeHour - openHour;
    //
    //     const filteredLengths = basicLength.filter(length => length <= hoursLeft);
    //     setReservationLengths(filteredLengths);
    //
    //     if (!filteredLengths.includes(Number(findFreeTables.reservationLength))) {
    //         setFindFreeTables(prev => ({
    //             ...prev,
    //             reservationLength: filteredLengths.length > 0 ? Math.min(...filteredLengths) : 2
    //         }));
    //     }
    // }

    const findFreeRestaurantTables = () => {
        const sendData = {
            ...findFreeTables,
            reservationStartTime: findFreeTables.reservationStartTime + ':00',
        }
        console.log(sendData)
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
                                    onClick={() => findFreeRestaurantTables()}>
                                Wyszukaj wolne stoliki
                            </button>
                        </div>
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