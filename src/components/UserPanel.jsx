import Menu from "./Menu.jsx";
import ProfileButtons  from "./ProfileButtons.jsx";
import React from "react";
import {Ban, CirclePlus} from "lucide-react"
import {useNavigate} from "react-router-dom";

function UserPanel() {
    const [reservations, setReservations] = React.useState([]);
    const [balanceOperations, setBalanceOperations] = React.useState([]);
    const [balance, setBalance] = React.useState(0);
    const navigate = useNavigate();

    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    return (
        <div>
            <Menu/>
            <div className="mt-52 mx-10">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-semibold">Panel klienta</h2>
                    <ProfileButtons />
                </div>
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
                            <p className="text-3xl">Saldo <b>{Number(balance).toFixed(2)} zł</b></p>
                            <button className="flex text-3xl justify-center items-center gap-2 cursor-pointer hover:text-logotexthover">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel;