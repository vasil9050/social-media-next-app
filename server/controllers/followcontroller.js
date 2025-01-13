import { db } from "../config/db.js"

export const createFollowRequest = (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ error: "Sender ID and Receiver ID are required." });
    }

    // SQL query to insert a new follow request
    const query = `
        INSERT INTO followrequest (senderId, receiverId, createdAt)
        VALUES (?, ?, NOW())
    `;

    db.query(query, [senderId, receiverId], (err, results) => {
        if (err) {
            console.error("Error creating follow request:", err.message);
            return res.status(500).json({ error: "Database error occurred." });
        }

        res.status(201).json({
            message: "Follow request created successfully.",
            followRequestId: results.insertId
        });
    });
};

export const acceptFollowRequest = (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ message: "Sender and receiver IDs are required." });
    }

    console.log(req.body);


    const deleteQuery = `
        DELETE FROM followrequest WHERE senderId = ? AND receiverId = ?
    `;

    const insertQuery = `
        INSERT INTO follower (followerId, followingId, createdAt)
        VALUES (?, ?, NOW())
    `;

    // First, delete the follow request
    db.query(deleteQuery, [senderId, receiverId], (deleteErr) => {
        if (deleteErr) {
            console.error("Error deleting follow request:", deleteErr.message);
            return res.status(500).json({ message: "Error deleting follow request." });
        }

        // Then, insert the new follower
        db.query(insertQuery, [senderId, receiverId], (insertErr, results) => {
            if (insertErr) {
                console.error("Error inserting follower:", insertErr.message);
                return res.status(500).json({ message: "Error inserting follower." });
            }

            res.status(200).json({ message: "Follow request accepted.", followerId: results.insertId });
        });
    });
};


export const declineFollowRequest = (req, res) => {
    const { id } = req.body;
    console.log(req.body);

    if (!id) {
        return res.status(400).json({ error: "Follow request ID is required." });
    }

    const query = `
        DELETE FROM followrequest
        WHERE id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error deleting follow request:", err.message);
            return res.status(500).json({ error: "Database error occurred." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Follow request not found." });
        }

        res.status(200).json({ message: "Follow request deleted successfully." });
    });
};


export const unfollow = (req, res) => {
    const { id } = req.body;
    console.log(req.body);

    if (!id) {
        return res.status(400).json({ error: "Follower ID is required." });
    }

    const query = `
        DELETE FROM follower
        WHERE id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error deleting follower:", err.message);
            return res.status(500).json({ error: "Database error occurred." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Follower not found." });
        }

        res.status(200).json({ message: "Follower deleted successfully." });
    });
};

// // Get Follow Requests
// export const getFollowRequests = async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ message: "User ID is required." });
//     }

//     const query = `
//         SELECT followrequest.senderId, user.username, user.avatar
//         FROM followrequest
//         JOIN user ON followrequest.senderId = user.id
//         WHERE followrequest.receiverId = ?
//     `;

//     try {
//         const [rows] = await db.execute(query, [userId]);
//         res.status(200).json(rows);
//     } catch (error) {
//         console.error("Error fetching follow requests:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };

export const isUserFollowed = (req, res) => {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ message: "Both followerId and followingId are required." });
    }

    const query = `
        SELECT 
            *, 
            1 AS isFollowing
        FROM 
            follower
        WHERE 
            followerId = ? AND followingId = ?
        LIMIT 1
    `;

    db.query(query, [followerId, followingId], (err, results) => {
        if (err) {
            console.error("Error checking follow status:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            // User is being followed
            return res.status(200).json(results[0]);
        }

        // User is not being followed
        return res.status(200).json([{ isFollowing: 0 }]);
    });
};

export const isUsersentFollowreq = (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ message: "senderId and receiverId are required." });
    }

    const query = `
        SELECT 
            *, 
            1 AS isFollowreq 
        FROM 
            followrequest 
        WHERE 
            senderId = ? AND receiverId = ?
        LIMIT 1

    `;

    db.query(query, [senderId, receiverId], (err, results) => {
        if (err) {
            console.error("Error checking follow request:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            // Follow request found
            return res.status(200).json(results[0]);
        }

        // No follow request found
        return res.status(200).json([{ followReqRes: 0 }]);
    });
};

export const getAllFollowReq = (req, res) => {
    const { receiverId } = req.body;
    console.log(req.body);

    if (!receiverId) {
        return res.status(400).json({ message: "receiverId is required." });
    }

    const query = `
        SELECT 
            fr.*,
            sender.username AS senderUsername,
            sender.avatar AS senderAvatar,
            sender.name AS senderName,
            sender.surname AS senderSurname,
            receiver.username AS receiverUsername,
            receiver.avatar AS receiverAvatar,
            receiver.name AS receiverName,
            receiver.surname AS receiverSurname
        FROM 
            followrequest fr
        INNER JOIN 
            User sender ON fr.senderId = sender.id
        INNER JOIN 
            User receiver ON fr.receiverId = receiver.id
        WHERE 
            fr.receiverId = ?
    `;

    db.query(query, [receiverId], (err, results) => {
        if (err) {
            console.error("Error fetching follow requests:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            console.log(results);
            return res.status(200).json(results);
        }

        return res.status(200).json([]);
    });
};
