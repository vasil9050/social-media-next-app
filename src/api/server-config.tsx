export const SERVER_BASE_URL = 'http://localhost:8080';
export const API_ENDPOINTS = {
    CREATE_USER: '/api/users/adduser',
    UPDATE_USER: '/api/users/updateuser',

    CREATE_POST: '/api/post/addpost',

    CREATE_LIKE: '/api/posts/like/addlike',

    GET_USER: '/api/users/getuser',
    GET_USER_BY_USERNAME: '/api/users/getuserbyusername',
    GET_POST: '/api/post/getpost',
    GET_LIKE: '/api/like/getlike',


    GET_ALLFOLLOW_REQ: '/api/follow/allFollowReq',
    CREATE_FOLLOW_REQ: '/api/follow/followrequest',
    IS_FOLLOWED: '/api/follow/isfollowing',
    IS_FOLLOW_REQ_RES: '/api/follow/isfollowreqsent',
    DELETE_FOLLOW_REQ: '/api/follow/declinefollowreq',
    DELETE_FOLLOW: '/api/follow/unfollow',
    ACCEPT_FOLLOW_REQ: 'api/follow/followreqaccepted'
};
