import Menu from "../Menu.jsx";
import {toast, ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllOpeningHours, putOpeningHours} from "../../api/openingHoursAPI.js";
import {NotebookPen} from "lucide-react";


const HourPicker = ({value, name, onChange, hours}) => {
    const shortValue = value.substring(0,5);

    return (
        <select
            name={name}
            value={shortValue}
            onChange={onChange}
            className="border-2 border-logotext rounded-xl p-3 text-2xl mt-1 mb-5 outline-none focus:border-logotexthover"
        >
            {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
            ))}
        </select>
    )
}

function OpeningHours() {
    const [openingHours, setOpeningHours] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState(null);

    const generateHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++){
            const hour = i.toString().padStart(2, "0");
            hours.push(`${hour}:00`);
            hours.push(`${hour}:30`);
        }
        return hours;
    }
    const [hours, setHours] = React.useState(generateHours);

    useEffect(() => {
        getAllOpeningHours()
            .then(result => {
                setOpeningHours(result);
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

    const handleEdit = (openingHours) => {
        setEditMode(true);
        setFormData(openingHours)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.openTime >= formData.closeTime){
            toast.error("Godzina otwarcia musi być wcześniejsza niż godzina zamknięcia!", {
                className: 'min-w-[450px]',
            });
            return
        }
        try {
            const response = await putOpeningHours(formData.dayOfWeek, formData);
            setOpeningHours(prevState =>
                prevState.map(day =>
                    day.dayOfWeek === response.dayOfWeek ? response : day
                )
            );
            setEditMode(false);
            setFormData(null);
            toast.success("Edytowano godziny otwarcia!", {
                className: 'min-w-[450px]',
            });

        }
        catch(error) {
            console.log(error);
            toast.error("Błąd edycji godzin otwarcia!", {
                className: 'min-w-[450px]',
            });
        }
    }

    const cancelEdit = () => {
        setEditMode(false);
        setFormData(null)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className="relative w-3/4 z-10">

                    {editMode && (
                        <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-4xl font-semibold text-center mb-8">{dayTranslations[formData.dayOfWeek] || formData.dayOfWeek}</h1>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col">
                                        <label>Godzina otwarcia</label>
                                        <HourPicker
                                            value={formData.openTime}
                                            name="openTime"
                                            onChange={(e) => setFormData({...formData, openTime: `${e.target.value}:00`})}
                                            hours={hours}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Godzina zamknięcia</label>
                                        <HourPicker
                                            value={formData.closeTime}
                                            name="closeTime"
                                            onChange={(e) => setFormData({...formData, closeTime: `${e.target.value}:00`})}
                                            hours={hours}
                                        />
                                    </div>
                                    <button type="submit"  className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Edytuj godziny otwarcia</button>
                                    <button type="button" onClick={() => cancelEdit()} className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anuluj edycję</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                        <h1 className="text-4xl font-semibold text-center mb-8">Godziny otwarcia</h1>
                        <div className="flex flex-col items-center">
                            {openingHours.map((openingHour) => (
                                <div key={openingHour.dayOfWeek} className="grid grid-cols-3 gap-40 mb-3 text-3xl">
                                    <p className="text-logotext font-semibold">{dayTranslations[openingHour.dayOfWeek] || openingHour.dayOfWeek} </p>
                                    <p>{openingHour.openTime.substring(0,5)} - {openingHour.closeTime.substring(0,5)}</p>
                                    <button onClick={() => handleEdit(openingHour)} className="cursor-pointer flex items-center gap-1 text-green-500 hover:text-green-700"> <NotebookPen /> Edytuj</button>
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