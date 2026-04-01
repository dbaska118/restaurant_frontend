import {useNavigate} from "react-router-dom";
import Menu from "../Menu.jsx";
import ProfileButtons from "../ProfileButtons.jsx";
import React from "react";

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
                <div>
                    <button onClick={() => navigateToPage("/admin/dishes")}>Karta dań</button>
                    <button onClick={() => navigateToPage("/admin/users")}>Użytkownicy</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;