import { BASE_URL_API } from './ProductsAPi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: BASE_URL_API,
});
const getToken = () => {
    return AsyncStorage.getItem('token');
};

api.interceptors.request.use(config => {
    const token = getToken(); // Retrieve the token from storage
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
