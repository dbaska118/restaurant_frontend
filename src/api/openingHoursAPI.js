import api from "./axiosAPI.js"

export const getAllOpeningHours = async () => {
    try {
        const response = await api.get("/openingHours");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const putOpeningHours = async (dayOfWeek, openingHours) => {
    try {
        const response = await api.put(`/openingHours/${dayOfWeek}`, openingHours);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}