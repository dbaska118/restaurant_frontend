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