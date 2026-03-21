import {createContext, useContext, useEffect, useState} from "react";
import {setAxiosAccessToken} from "./api/axiosAPI.js";
import {refreshToken, logout as logoutApi} from "./api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setAccessToken(userData.token);
        setUser({ email: userData.email, role: userData.role });
        setAxiosAccessToken(userData.token);
    }

    const logout = async () => {
        await logoutApi();
        setAccessToken(null);
        setUser(null);
        setAxiosAccessToken(null);
    }

    useEffect(() => {
        const refresh = async () => {
            try {
                const data = await refreshToken();
                login(data)
            } catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false);
            }
        }
        refresh();
    }, [])

    if(loading){
        return null;
    }


    return (<AuthContext.Provider value={{accessToken, user, login, logout,  setAccessToken}}>{children}</AuthContext.Provider>)
}
export const useAuth = () => useContext(AuthContext);