import api from "./axiosAPI.js";
import {data} from "react-router-dom";

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

export const  getNextReservations = async () => {
    try {
        const response = await api.get(`/reservation/employee/nextReservation`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTodayReservationsByEmail = async (email) => {
    try {
        const response = await api.get(`/reservation/employee/${email}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}