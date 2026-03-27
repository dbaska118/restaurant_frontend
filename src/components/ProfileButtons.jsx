import {useAuth} from "../AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {LogOut, Settings, SquareAsterisk} from "lucide-react";
import {toast, ToastContainer} from "react-toastify";
import React from "react";

function ProfileButtons() {
    const { logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Wylogowano!", {
                className: 'min-w-[450px]',
            });
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex text-3xl gap-12">
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <button className="flex justify-center items-center gap-2 cursor-pointer hover:text-logotexthover" onClick={() => navigate("/changeName")}>
                <Settings className="w-7 h-7"/>
                <p>Edycja profilu</p>
            </button>
            <button className="flex justify-center items-center gap-2 cursor-pointer hover:text-logotexthover" onClick={() => navigate("/changePassword")}>
                <SquareAsterisk className="w-7 h-7"/>
                <p>Zmiana hasła</p>
            </button>
            <button onClick={() => handleLogout()} className="flex justify-center items-center gap-2 cursor-pointer hover:text-logotexthover">
                <LogOut className="w-7 h-7"/>
                <p>Wyloguj</p>
            </button>
        </div>
    )
}

export default ProfileButtons;