import Menu from "../Menu.jsx";
import ProfileButtons  from "../ProfileButtons.jsx";
import React, {useEffect} from "react";
import {Ban, CirclePlus} from "lucide-react"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.jsx";
import {getClientBalance, getName} from "../../api/userAPI.js";
import {addFunds, getAllBalanceOperation} from "../../api/balanceOperationAPI.js";
import {toast, ToastContainer} from "react-toastify";

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
                console.log(response);
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
                                    <p className="text-3xl">Przejdź do <button onClick={() => navigateToPage("/dishes")} className="cursor-pointer hover:text-logotexthover">podstrony rezerwacji</button>, aby dokonać nowej.</p>
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