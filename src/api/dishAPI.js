import api from "./axiosAPI.js"

export const createDish = async (data) => {
    try {
        const response = await api.post("/dish", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteDish = async (id) => {
    try {
        const response = await api.delete(`/dish/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllDishes = async () => {
    try {
        const response = await api.get("/dish");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const putDish = async (id, dish) => {
    try {
        const response = await api.put(`/dish/${id}`, dish);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}