import axios from 'axios';

const API_URL = 'http://localhost:3000/bfhl'; // Update to your deployed URL later

export const getOperationCode = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching operation code:', error);
        throw error;
    }
};

export const postData = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
