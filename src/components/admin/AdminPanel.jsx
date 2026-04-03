import {useNavigate} from "react-router-dom";
import Menu from "../Menu.jsx";
import ProfileButtons from "../ProfileButtons.jsx";
import React from "react";
import {CookingPot, User, Clock} from "lucide-react"
import { Icon } from 'lucide-react';
import { chairsTablePlatter } from '@lucide/lab';


function AdminPanel() {
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
                    <h2 className="text-4xl font-semibold">Panel administratora</h2>
                    <ProfileButtons />
                </div>
                <div className="flex flex-col items-center justify-center gap-16 mt-20">
                    <button className="flex justify-center items-center gap-2 w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover"
                        onClick={() => navigateToPage("/admin/dishes")}>
                        <CookingPot className="w-8 h-8"/>
                        <p className="text-3xl">Karta dań</p>
                    </button>
                    <button className="flex justify-center items-center gap-2 w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover"
                            onClick={() => navigateToPage("/admin/users")}>
                        <User className="w-8 h-8"/>
                        <p className="text-3xl">Użytkownicy</p>
                    </button>
                    <button className="flex justify-center items-center gap-2 w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover"
                            onClick={() => navigateToPage("/admin/openingHours")}>
                        <Clock className="w-8 h-8"/>
                        <p className="text-3xl">Godziny otwarcia</p>
                    </button>
                    <button className="flex justify-center items-center gap-2 w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover"
                            onClick={() => navigateToPage("/admin/openingHours")}>
                        <Icon iconNode={chairsTablePlatter} className="w-9 h-9" />
                        <p className="text-3xl">Stoliki</p>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AdminPanel;