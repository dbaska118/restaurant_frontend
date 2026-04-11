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