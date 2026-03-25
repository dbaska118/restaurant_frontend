import api from "./axiosAPI.js"

export const changePassword = async (data) => {
    try {
        const response = await api.post("/user/changePassword", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};