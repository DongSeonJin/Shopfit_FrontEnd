import axios from "axios";


/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async ({ email, password }) => {
    const data = { email, password };
    const response = await axios.post('/login', data);
    return response.data;
}




/** SIGNUP API */
export const signUp = async ({ email, password, nickname, imageUrl, confirmPassword }) => {
    const data = { email, password, nickname, imageUrl, confirmPassword };
    const response = await axios.post(`/signup`, data);
    return response.data;
}