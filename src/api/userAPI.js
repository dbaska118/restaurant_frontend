import api from "./axiosAPI.js"

export const changePassword = async (data) => {
    try {
        const response = await api.post("/user/changePassword", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getClientBalance = async (email) => {
    try {
        const response = await api.get(`/user/balance/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getName = async (email) => {
    try {
        const response = await api.get(`/user/name/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const changeName = async (data) => {
    try {
        const response = await api.post(`/user/name`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}