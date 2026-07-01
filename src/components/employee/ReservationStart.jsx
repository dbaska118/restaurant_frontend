import {toast, ToastContainer} from "react-toastify";
import React from "react";
import {getTodayReservationsByEmail} from "../../api/reservationAPI.js";
import {Ban} from "lucide-react";

function ReservationStart() {
    const [reservations, setReservations] = React.useState(null);
    const [selectedReservation, setSelectedReservation] = React.useState(null);
    const [email, setEmail] = React.useState("");

    const findReservations = async () => {
        if(email === "") {
            toast.error("Przed próbą wyszukania wprowadź adres e-mail!", {
                className: 'min-w-[450px]',
            });
        }
        else {
            try {
                const response = await getTodayReservationsByEmail(email);
                console.log(response);
                setReservations(response);
            }
            catch (error) {
                console.log(error);
                toast.error("Błąd pobrania rezerwacji!", {
                    className: 'min-w-[450px]',
                });
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className=" w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        <h1 className="text-4xl font-semibold text-center mb-5">Rozpoczęcie rezerwacji</h1>
                        <div className="flex flex-col items-center mb-10">
                            <label className="text-3xl  mb-2">Znajdź rezerwacje na podstawie adresu e-mail</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Adres e-mail"
                                className="w-1/2 border-2 border-logotext rounded-xl p-3 text-xl text-center mt-1 mb-2 outline-none focus:border-logotexthover">
                            </input>
                            <button  onClick={findReservations} className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Wyszukaj rezerwacje</button>
                        </div>
                        {reservations !== null && (
                            <div>
                                <hr className="border-t-2 mt-4 border-logotext w-full" />
                                {reservations.length === 0 && (
                                    <div className="mt-10 flex flex-col items-center justify-center">
                                        <Ban className="w-44 h-44 mb-10"/>
                                        <h1 className="text-4xl font-semibold">Nie znaleziono dzisiejszych rezerwacji na podanego adresu e-mail!</h1>
                                    </div>
                                )}
                                {reservations.length > 0 && (
                                    <div className="mt-10 flex flex-col items-center justify-center">
                                        <h1 className="text-3xl font-semibold">Znalezione rezerwacje</h1>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationStart;