import Menu from "../Menu.jsx";
import {ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllOpeningHours} from "../../api/openingHoursAPI.js";
import {NotebookPen} from "lucide-react";

function OpeningHours() {
    const [openingHours, setOpeningHours] = React.useState([]);
    useEffect(() => {
        getAllOpeningHours()
            .then(result => {
                setOpeningHours(result);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    const dayTranslations = {
        "MONDAY": "Poniedziałek",
        "TUESDAY": "Wtorek",
        "WEDNESDAY": "Środa",
        "THURSDAY": "Czwartek",
        "FRIDAY": "Piątek",
        "SATURDAY": "Sobota",
        "SUNDAY": "Niedziela"
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className="relative w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                        <h1 className="text-4xl font-semibold text-center mb-8">Godziny otwarcia</h1>
                        <div className="flex flex-col items-center">
                            {openingHours.map((openingHour) => (
                                <div key={openingHour.dayOfWeek} className="grid grid-cols-3 gap-40 mb-3 text-3xl">
                                    <p className="text-logotext font-semibold">{dayTranslations[openingHour.dayOfWeek] || openingHour.dayOfWeek} </p>
                                    <p>{openingHour.openTime.substring(0,5)} - {openingHour.closeTime.substring(0,5)}</p>
                                    <button className="cursor-pointer flex items-center gap-1 text-green-500 hover:text-green-700"> <NotebookPen /> Edytuj</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningHours;