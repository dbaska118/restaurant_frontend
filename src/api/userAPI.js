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

export const getClientBalance = async (email) => {
    try {
        const response = await api.get(`/user/balance/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getName = async (email) => {
    try {
        const response = await api.get(`/user/name/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const changeName = async (data) => {
    try {
        const response = await api.post(`/user/name`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addUser = async (data) => {
    try {
        const response = await api.post("/user", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addAdmin = async (data) => {
    try {
        const response = await api.post("/user/headAdmin", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await api.get("/user");
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await api.get("/user/headAdmin");
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/user/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteAdmin = async (id) => {
    try {
        const response = await api.delete(`/user/headAdmin/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const putUser = async (id, data) => {
    try {
        const response = await api.put(`/user/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const putAdmin = async (id, data) => {
    try {
        const response = await api.put(`/user/headAdmin/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}