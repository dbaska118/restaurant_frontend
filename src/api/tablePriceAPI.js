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

export const getAllTablePrice = async () => {
    try {
        const response = await api.get("/tablePrice");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};