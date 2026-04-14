import api from "./axiosAPI";

export const createRestaurantTable = async (data) => {
    try {
        const response = await api.post("/restaurantTable", data);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllRestaurantTable = async () => {
    try {
        const response = await api.get("/restaurantTable");
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}