export const SERVER_BASE_URL = 'http://localhost:8080';
export const API_ENDPOINTS = {
    CREATE_USER: '/api/users/adduser',
    UPDATE_USER: '/api/users/updateuser',
    GET_USER: '/api/users/getuser',
    GET_USER_BY_USERNAME: '/api/users/getuserbyusername',
    UPADTE_COVER: 'api/users/updatecover',


    GET_LIKE: '/api/like/getlike',
    CREATE_LIKE: '/api/like/createlike',
    DELETE_LIKE: '/api/like/deletelike',

    GET_POST: '/api/post/getpost',
    CREATE_POST: '/api/post/addpost',
    GET_POST_BY_USERNAME: '/api/post/getpostbyusername',
    GET_POST_HOME: '/api/post/gethomepageposts',
    DELETE_POST: '/api/post/deletepost',


    GET_ALLFOLLOW_REQ: '/api/follow/allFollowReq',
    CREATE_FOLLOW_REQ: '/api/follow/followrequest',
    IS_FOLLOWED: '/api/follow/isfollowing',
    IS_FOLLOW_REQ_RES: '/api/follow/isfollowreqsent',
    DELETE_FOLLOW_REQ: '/api/follow/declinefollowreq',
    DELETE_FOLLOW: '/api/follow/unfollow',
    ACCEPT_FOLLOW_REQ: 'api/follow/followreqaccepted',

    GET_FRIENDS: 'api/follow/getFriends',

    SEND_MESSAGE: 'api/chat/sendmessage',
    USER_CHAT: 'api/chat/chatHistory'
};
