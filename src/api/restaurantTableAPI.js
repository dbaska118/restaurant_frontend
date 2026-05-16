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

export const deleteRestaurantTable = async (id) => {
    try {
        const response = await api.delete(`/restaurantTable/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateRestaurantTable = async (id, data) => {
    try {
        const response = await api.put(`/restaurantTable/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateRestaurantTableStatus = async (id, data) => {
    try {
        const response = await api.patch(`/restaurantTable/${id}/status`, data);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}