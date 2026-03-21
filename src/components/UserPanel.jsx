import {useAuth } from "../AuthContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function UserPanel() {
    const { logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Wyloguj</button>
        </div>
    )
}

export default UserPanel;