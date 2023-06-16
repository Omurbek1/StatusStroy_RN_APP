import axios from 'axios';
import { BASE_URL_API } from './ProductsAPi';

// Set your API base URL
axios.defaults.baseURL = BASE_URL_API;

// API function for authentication
export const login = async (identifier, password) => {
    try {
        const response = await axios.post('/auth/local', { identifier, password });
        const token = response.data.jwt;
        console.log(response);
        return token;
    } catch (error) {
        throw new Error('Authentication failed');
    }
};
