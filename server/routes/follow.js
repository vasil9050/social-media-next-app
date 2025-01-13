import express from 'express'
import {
    createFollowRequest,
    acceptFollowRequest,
    declineFollowRequest,
    unfollow,
    getAllFollowReq,
    isUsersentFollowreq,
    isUserFollowed
} from "../controllers/followcontroller.js";
const router = express.Router()

router.post('/followrequest', createFollowRequest);
router.post("/followreqaccepted", acceptFollowRequest);
router.post("/unfollow", unfollow);
router.post("/declinefollowreq", declineFollowRequest);
router.post("/allFollowReq", getAllFollowReq);
router.post("/isfollowing", isUserFollowed);
router.post("/isfollowreqsent", isUsersentFollowreq);


export default router