import api from "./axiosAPI.js"


export const addFunds = async (addBalanceRequest) => {
    try {
        const response = await api.post(`/balanceOperation/addFunds`, addBalanceRequest);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllBalanceOperation = async (email) => {
    try {
        const response = await api.get(`/balanceOperation/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}