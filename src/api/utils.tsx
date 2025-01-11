import axios, { AxiosError } from 'axios';
import { SERVER_BASE_URL, API_ENDPOINTS } from './server-config';

// Define types for request payloads
interface AddUserRequest {
    username: string;
    avatar?: string;
    cover?: string;
    name?: string;
    surname?: string;
    description?: string;
    city?: string;
    school?: string;
    work?: string;
    website?: string;
}

interface GetUserRequest {
    id: string;
}

interface AddPostRequest {
    desc: string;
    img?: string;
    userId: string;
}

interface GetPostRequest {
    id: string;
}

// Axios instance
const axiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API Request Functions
export const addUserReq = (userData: AddUserRequest) => {
    return axiosInstance.post(API_ENDPOINTS.CREATE_USER, userData);
};

export const getUserReq = ({ id }: GetUserRequest) => {
    return axiosInstance.get(`${API_ENDPOINTS.GET_USER}/${id}`);
};

export const addPostReq = (postData: AddPostRequest) => {
    return axiosInstance.post(API_ENDPOINTS.CREATE_POST, postData);
};

export const getPostReq = ({ id }: GetPostRequest) => {
    return axiosInstance.get(`${API_ENDPOINTS.GET_POST}/${id}`);
};

// Utility to handle errors
export const handleApiError = (error: AxiosError) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(
            (error.response.data as { message?: string }).message || 'Something went wrong',
        );
    } else {
        console.error('Network Error:', error.message);
        throw new Error('Network error');
    }
};
