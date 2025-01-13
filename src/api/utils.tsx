import axios, { AxiosError } from 'axios';
import { SERVER_BASE_URL, API_ENDPOINTS } from './server-config';

// Define types for request payloads
interface AddUserRequest {
    id?: string;
    username?: string;
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

interface GetUserByUserNameRequest {
    username: string;
}

interface AddPostRequest {
    desc: string;
    img?: string;
    userId: string;
}

interface GetPostRequest {
    id: string;
}

interface GetIsFollowed {
    followerId: string;
    followingId: string;
}

interface GetIsFollowReqRes {
    senderId: string;
    receiverId: string;
}

interface isdelete {
    id: string;
}

interface followReceive {
    receiverId: string;
}

interface CoverRequest {
    cover: File;
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

export const updateUserReq = (userData: AddUserRequest) => {
    return axiosInstance.post(API_ENDPOINTS.UPDATE_USER, userData);
};

export const updateCoverReq = (userData: CoverRequest) => {
    return axiosInstance.post(API_ENDPOINTS.UPADTE_COVER, userData);
};

export const getUserbyusernameReq = ({ username }: GetUserByUserNameRequest) => {
    return axiosInstance.get(`${API_ENDPOINTS.GET_USER_BY_USERNAME}/${username}`);
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

export const getAllFollowReq = (followData: followReceive) => {
    return axiosInstance.post(API_ENDPOINTS.GET_ALLFOLLOW_REQ, followData);
};

export const getIsFollowed = (followData: GetIsFollowed) => {
    return axiosInstance.post(API_ENDPOINTS.IS_FOLLOWED, followData);
};

export const getIsFollowReqRes = (followData: GetIsFollowReqRes) => {
    return axiosInstance.post(API_ENDPOINTS.IS_FOLLOW_REQ_RES, followData);
};

export const deleteFollow = (followData: isdelete) => {
    return axiosInstance.post(API_ENDPOINTS.DELETE_FOLLOW, followData);
};

export const deleteFollowReq = (followData: isdelete) => {
    return axiosInstance.post(API_ENDPOINTS.DELETE_FOLLOW_REQ, followData);
};

export const createFollowReq = (followData: GetIsFollowReqRes) => {
    return axiosInstance.post(API_ENDPOINTS.CREATE_FOLLOW_REQ, followData);
};

export const acceptFollowReq = (followData: GetIsFollowReqRes) => {
    return axiosInstance.post(API_ENDPOINTS.ACCEPT_FOLLOW_REQ, followData);
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
