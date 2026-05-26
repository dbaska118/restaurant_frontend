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