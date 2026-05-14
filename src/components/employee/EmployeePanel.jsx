import {useNavigate} from "react-router-dom";
import ProfileButtons from "../ProfileButtons.jsx";
import {CookingPot, Icon, User} from "lucide-react";
import React from "react";
import {chairsTablePlatter} from "@lucide/lab";

function EmployeePanel() {

    const navigate = useNavigate();



    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    return (
        <div>
            <div className="mt-52 mx-10">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-semibold">Panel Pracownika</h2>
                    <ProfileButtons />
                </div>
                <div className="grid grid-cols-2 mt-20 gap-10">
                    <button className="flex justify-center items-center gap-2 w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover"
                            onClick={() => navigateToPage("/employee/restaurantablestatus")}>
                        <Icon iconNode={chairsTablePlatter} className="w-9 h-9" />
                        <p className="text-3xl">Zarządzanie obłożeniem stolików</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmployeePanel;