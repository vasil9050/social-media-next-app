export const SERVER_BASE_URL = 'http://localhost:8080';
export const API_ENDPOINTS = {
    CREATE_USER: '/api/users/adduser',
    UPDATE_USER: '/api/users/updateuser',
    GET_USER: '/api/users/getuser',
    GET_USER_BY_USERNAME: '/api/users/getuserbyusername',
    UPADTE_COVER: 'api/users/updatecover',


    GET_LIKE: '/api/like/getlike',
    CREATE_LIKE: '/api/posts/like/addlike',

    GET_POST: '/api/post/getpost',
    CREATE_POST: '/api/post/addpost',

    GET_ALLFOLLOW_REQ: '/api/follow/allFollowReq',
    CREATE_FOLLOW_REQ: '/api/follow/followrequest',
    IS_FOLLOWED: '/api/follow/isfollowing',
    IS_FOLLOW_REQ_RES: '/api/follow/isfollowreqsent',
    DELETE_FOLLOW_REQ: '/api/follow/declinefollowreq',
    DELETE_FOLLOW: '/api/follow/unfollow',
    ACCEPT_FOLLOW_REQ: 'api/follow/followreqaccepted'
};
