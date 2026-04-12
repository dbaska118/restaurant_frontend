import api from "./axiosAPI.js";

export const createTablePrice = async (data) => {
    try {
        const response = await api.post("/tablePrice", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};