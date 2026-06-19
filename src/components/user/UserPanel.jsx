import Menu from "../Menu.jsx";
import ProfileButtons  from "../ProfileButtons.jsx";
import React, {useEffect, useState} from "react";
import {Ban, CirclePlus, Trash2} from "lucide-react"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.jsx";
import {getClientBalance, getName} from "../../api/userAPI.js";
import {addFunds, getAllBalanceOperation} from "../../api/balanceOperationAPI.js";
import {toast, ToastContainer} from "react-toastify";
import {getAllReservationsByEmail, cancelReservationClient} from "../../api/reservationAPI.js";
import {Eye, EyeOff} from "lucide-react";

const SecretCode = ({ code }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="flex justify-center items-center gap-2">
            <p className="text-2xl">
                Kod rezerwacji: <span className="font-semibold" > {isVisible ? code : "••••••"} </span>
            </p>
            <button onClick={() => setIsVisible(!isVisible)} className="text-gray-600 hover:text-black hover:cursor-pointer">
                {isVisible ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
};

function UserPanel() {
    const [reservations, setReservations] = React.useState([]);
    const [balanceOperations, setBalanceOperations] = React.useState([]);
    const [balance, setBalance] = React.useState(0);
    const navigate = useNavigate();
    const {user} = useAuth()
    const [name, setName] = React.useState({});
    const [addingBalance, setAddingBalance] = React.useState(false);
    const [addBalance, setAddBalance] = React.useState({
        email: user?.email || null,
        amount: 10,
    });
    const [cancelingReservation, setCancelingReservation] = React.useState(false);
    const [cancelReservationId, setCancelReservationId] = React.useState(null);
    const [refund, setRefund] = React.useState(0);


    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    useEffect(() => {
        if (!user?.email) return;

       getClientBalance(user.email)
            .then((response) => {
               setBalance(response);
            })
            .catch((error) => {
                console.log(error)
                setBalance(undefined);
            })
    }, [user?.email])

    useEffect(() => {
        if (!user?.email) return;

        getAllReservationsByEmail(user.email)
            .then((response) => {
                setReservations(response);
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [user?.email]);

    useEffect(() => {
        if (!user?.email) return;

        getName(user.email)
            .then((response) => {
                setName(response);
            })
            .catch((error) => {
                console.log(error)
                setName(undefined);
            })
    }, [user?.email])

    useEffect(() => {
        if (!user?.email) return;

       getAllBalanceOperation(user.email)
            .then((response) => {
                setBalanceOperations(response);

            })
            .catch((error) => {
                console.log(error)
            })
    }, [user?.email])

    const handleAddFunds = async (e) => {
        e.preventDefault();
        try {
            const response = await addFunds(addBalance);
            setBalance(balance + addBalance.amount)
            setBalanceOperations((prevState => [...prevState, response]));
            setAddingBalance(false);
            toast.success("Doładowano konto!", {
                className: 'min-w-[450px]',
            });
            setAddBalance({
                email: user?.email || null,
                amount: 10,
            })
        }
        catch (error) {
            console.log(error);
            toast.error("Błąd doładowania konta!", {
                className: 'min-w-[450px]',
            });
        }

    }

    const cancelReservationConfirm = (reservation) => {
        setCancelingReservation(true);
        setCancelReservationId(reservation.id)

        const diffInHours = (new Date(reservation.startTime) - new Date()) / (1000 * 60 * 60);
        if (diffInHours > 24) {
            setRefund(reservation.price)
        }
        else if (diffInHours > 12) {
            setRefund(reservation.price * 0.75)
        }
        else if (diffInHours > 6) {
            setRefund(reservation.price * 0.5)
        }
        else {
            setRefund(reservation.price * 0.2)
        }
    }

    const backReservationCancel = () => {
        setCancelingReservation(false);
        setCancelReservationId(null);
        setRefund(0);
    }

    const handleCancelReservation = async (e) => {
        e.preventDefault();
        try {
            console.log(cancelReservationId);
            const response = await cancelReservationClient(cancelReservationId);
            setBalanceOperations((prevState) => [...prevState, response]);
            setReservations(prevState => prevState.filter(reservation => reservation.id !== cancelReservationId));
            setBalance(response.balanceAfter)
            toast.success("Anulowano rezerwację!", {
                className: 'min-w-[450px]',
            });
        }
        catch (error) {
            if(error.status === 404) {
                toast.error('Nie znaleziono rezerwacji!', {
                    className: 'min-w-[450px]',
                });
            }
            else if (error.status === 400) {
                toast.error('Czas na anulowanie rezerwacji minął!', {
                    className: 'min-w-[450px]',
                });
            }
            else {
                toast.error('Błąd anulowania rezerwacji!', {
                    className: 'min-w-[450px]',
                });
            }
        }
        setTimeout(() => {
            setCancelReservationId(null);
            setCancelingReservation(false);
            setRefund(0);
        }, 1500);
    }

    return (
        <div>
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="mt-52 mx-10 mb-20">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-semibold">{name === undefined ? 'Błąd pobrania imienia i nazwiska!' : `Witaj, ${name.firstName} ${name.lastName}!`}</h2>
                    <ProfileButtons />
                </div>
                {addingBalance && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <form onSubmit={handleAddFunds} className="w-full max-w-[750px] bg-white flex flex-col border-3  border-logotext rounded-xl pt-6 pb-12  px-12 text-2xl">
                            <h3 className="text-4xl font-bold mb-6 text-center">Doładuj saldo</h3>
                            <label className="mb-2">Kwota doładowania konta (min. 10 zł):</label>
                            <input
                                className="border-2 border-logotext rounded-xl p-4 text-xl mt-1 mb-10 outline-none focus:border-logotexthover"
                                type="number"
                                name="amount"
                                min={10}
                                step="0.01"
                                value={addBalance.amount}
                                onChange={(e) => setAddBalance({...addBalance, amount: Number(e.target.value)})}
                            />
                            <button type="submit"  className="w-full mb-6 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj środki</button>
                            <button type="button" onClick={() => setAddingBalance(false)} className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anuluj doładowanie</button>
                        </form>
                    </div>
                )}
                {cancelingReservation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <form onSubmit={handleCancelReservation} className="w-full max-w-[750px] bg-white flex flex-col border-3  border-logotext rounded-xl pt-6 pb-12  px-12 text-2xl">
                            <h3 className="text-4xl font-bold mb-6 text-center">Anluj rezerwację</h3>
                            <label className="mb-2 text-center">Czy jesteś pewny, że chcesz anulować rezerwację?</label>
                            <label className="mb-2 text-center">Otrzymasz zwrot: <span className="font-semibold">{refund} zł</span> </label>
                            <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer mb-4">
                                <p>Sprawdź regulamin rezerwacji</p>
                            </button>
                            <button type="submit"  className="w-full mb-6 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anluj rezerwację</button>
                            <button type="button" onClick={() => backReservationCancel()} className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Powrót</button>
                        </form>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-24 justify-between mx-10 mt-10">
                    <div>
                        <div className="border-b w-full pb-4 pl-4">
                            <p className="text-3xl">Twoje rezerwacje</p>
                        </div>
                        <div>
                            {reservations.length === 0 && (
                                <div className="flex flex-col items-center justify-center mt-30">
                                    <Ban className="w-44 h-44 mb-10"/>
                                    <h1 className="text-4xl font-semibold mb-4">Nie znaleziono rezerwacji!</h1>
                                    <p className="text-3xl">Przejdź do <button onClick={() => navigateToPage("/reservations")} className="cursor-pointer hover:text-logotexthover">podstrony rezerwacji</button>, aby dokonać nowej.</p>
                                </div>
                            )}
                            {reservations.length > 0 && (
                                <div>
                                    {reservations
                                        .sort((a,b) => new Date(a.startTime) - new Date(b.startTime))
                                        .map(reservation => (
                                        <div key={reservation.id} className="flex flex-col border border-footertext bg-amber-50 mt-6 p-3 rounded-xl text-2xl">
                                            <div className="text-center w-full mb-4">
                                                <h1 className="text-3xl font-semibold my-2">{reservation.tableName}</h1>
                                                <h1>
                                                    {"Data rezerwacji: "}
                                                    <span className="font-semibold">
                                                        {new Date(reservation.startTime).toLocaleString('pl-PL', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                        {" - "}
                                                        {new Date(reservation.endTime).toLocaleString('pl-PL', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className="grid grid-cols-2 text-center mb-4">
                                                <p>Ilość miejsc: <span className="font-semibold">{reservation.numberOfChairs}</span> </p>
                                                <p>Cena rezerwacji: <span className="font-semibold"> {reservation.price} zł </span> </p>
                                            </div>
                                            <SecretCode code={reservation.reservationCode} />
                                            <div className="flex justify-center mt-4">
                                                <button onClick={() => cancelReservationConfirm(reservation)} className="flex items-center justify-center gap-2 w-1/2 mt-2 p-3 border-2 border-red-200 text-red-600 bg-red-50/30 rounded-xl text-xl  hover:bg-red-600 hover:text-white hover:cursor-pointer">
                                                    <Trash2 size={20} />
                                                    Anuluj rezerwację
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between border-b w-full pb-4 pl-4">
                            <p className="text-3xl">Saldo <b>{balance === undefined ? "Błąd pobrania salda" : `${Number(balance).toFixed(2)} zł`}</b></p>
                            <button onClick={() => setAddingBalance(true)}
                                className="flex text-3xl justify-center items-center gap-2 cursor-pointer hover:text-logotexthover">
                                <CirclePlus className="w-7 h-7"/>
                                <p>Dodaj środki</p>
                            </button>
                        </div>
                        <div>
                            {balanceOperations.length === 0 && (
                                <div className="flex flex-col items-center justify-center mt-30">
                                    <Ban className="w-44 h-44 mb-10"/>
                                    <h1 className="text-4xl font-semibold">Nie znaleziono operacji na saldzie konta!</h1>
                                </div>
                            )}
                            {balanceOperations.length > 0 && (
                               <table className="text-2xl w-full mt-6 text-left">
                                   <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Typ</th>
                                            <th className="text-right">Przed</th>
                                            <th className="text-right">Zmiana</th>
                                            <th className="text-right">Po</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                   {balanceOperations
                                       .slice()
                                       .sort((a,b) => new Date(b.operationDate) - new Date(a.operationDate))
                                       .map((operation) => (
                                       <tr className="border-b-2 border-gray-400" key={operation.id}>
                                           <td className="py-4">
                                               {new Date(operation.operationDate).toLocaleString('pl-PL', {
                                               day: '2-digit',
                                               month: '2-digit',
                                               year: 'numeric',
                                               hour: '2-digit',
                                               minute: '2-digit'
                                           })}</td>
                                           <td className="py-4">{operation.operationType === "ADD_FUNDS" ? "Doładowanie" : operation.operationType === "RESERVATION" ? "Rezerwacja" : "Anulowanie rezerwacji"}</td>
                                           <td className="py-4 text-right">{Number(operation.balanceBefore).toFixed(2)} zł</td>
                                           <td className={`py-4 text-right font-bold ${operation.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{Number(operation.amount).toFixed(2)} zł</td>
                                           <td className="py-4 text-right">{Number(operation.balanceAfter).toFixed(2)} zł</td>
                                       </tr>
                                   ))}
                                   </tbody>
                               </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel;