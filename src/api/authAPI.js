import api from "./axiosAPI";

export const registerUser = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas tworzenia konta:', error.message);
        throw error;
    }
}

export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas logowania:', error.message);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await api.post('/auth/refresh');
        return response.data;
    }
    catch (error) {
        console.error("Błąd odświeżenia tokenu")
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    }
    catch (error) {
        console.error("Błąd wylogowania")
        throw error;
    }
}