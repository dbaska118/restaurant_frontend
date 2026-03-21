import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const apiRefresh = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true,
});

let tokenMemory = null;
export const setAxiosAccessToken = (token) => {
    tokenMemory = token;
}

api.interceptors.request.use(
    (config) => {
        if (tokenMemory) {
            config.headers.Authorization = `Bearer ${tokenMemory}`;
        }
        return config;
    },
    (error) => {
        console.error('Błąd tokena:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config
        if (request.url.includes('/auth/refresh')) {
            setAxiosAccessToken(null);
            return Promise.reject(error);
        }
        if(error.response.status === 403){
            window.location.href = '/';
            return Promise.reject(error);
        }
        if (error.response && error.response.status === 401 && !request._retry) {
            request._retry = true;

            try {
                const res = await apiRefresh.post('api/auth/refresh');
                console.log(res.data);
                const token = res.data.token;
                setAxiosAccessToken(token);

                request.headers.Authorization = `Bearer ${token}`;
                return api(request);

            }
            catch(error) {
                setAxiosAccessToken(null)
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
