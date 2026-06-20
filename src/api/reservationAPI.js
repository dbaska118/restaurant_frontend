import api from "./axiosAPI.js";

export const getAllReservationsByEmail = async (email) => {
    try {
        const response = await api.get(`/reservation/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const cancelReservationClient = async (id) => {
    try {
        const response = await api.post(`/reservation/client/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const findAllFreeRestuarantTables = async (data) => {
    try {
        const response = await api.post(`/reservation/freeTables`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const createReservationClient = async (data) => {
    try {
        const response = await api.post(`/reservation/client`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}