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

export const updateTablePrice = async (numberOfChairs, data) => {
    try {
        const response = await api.put(`/tablePrice/${numberOfChairs}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteTablePrice = async (numberOfChairs) => {
    try {
        const response = await api.delete(`/tablePrice/${numberOfChairs}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPossibleNumberOfChairs = async () => {
    try {
        const response = await api.get("/tablePrice/possibleNumberOfChairs");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

