import { db } from "../config/db.js"

export const addUser = (req, res) => {
    const {
        id,
        username,
        avatar,
        cover,
        name,
        surname,
        description,
        city,
        school,
        work,
        website,
    } = req.body;

    console.log(">>>>", req.body);


    if (!id || !username) {
        return res.status(400).json({ error: "ID and username are required fields." });
    }

    const query = `
        INSERT INTO user (
          id, username, avatar, cover, name, surname, description, city, school, work, website, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;

    db.query(
        query,
        [
            id,
            username,
            avatar || null,
            cover || null,
            name || null,
            surname || null,
            description || null,
            city || null,
            school || null,
            work || null,
            website || null,
        ],
        (err, results) => {
            if (err) {
                console.error("Error inserting user:", err.message);
                return res.status(500).json({ error: "Database error occurred." });
            }
            res.status(201).json({ message: "User created successfully.", userId: id });
        }
    );
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    const query = `
    SELECT 
        user.*, 
        COUNT(follower.followerId) AS followersCount
    FROM user
    LEFT JOIN follower 
    ON user.id = follower.followingId
    WHERE user.id = ?
    GROUP BY user.id
`;
    try {
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error inserting post:", err.message);
                return res.status(500).json({ error: "Failed to insert post." });
            }
            console.log(result);
            if (!result || result.length === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUser = (req, res) => {
    const { id, ...fieldsToUpdate } = req.body;

    if (!id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    console.log(fieldsToUpdate);
    const filteredFields = Object.entries(fieldsToUpdate).filter(
        ([key, value]) => value !== "" && value !== undefined
    );

    if (filteredFields.length === 0) {
        return res.status(400).json({ error: "No valid fields to update." });
    }

    const columns = filteredFields.map(([key]) => `${key} = ?`).join(", ");
    const values = filteredFields.map(([, value]) => value);
    const query = `
      UPDATE user
      SET ${columns}
      WHERE id = ?
    `;

    values.push(id);

    console.log(query);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error updating user profile:", err.message);
            return res.status(500).json({ error: "Database error occurred." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User profile updated successfully." });
    });
};

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    const query = `
      SELECT 
        u.id, u.username, u.avatar, u.cover, u.name, u.surname, 
        u.description, u.city, u.school, u.work, u.website, 
        COUNT(DISTINCT f1.followerId) AS followersCount,
        COUNT(DISTINCT f2.followingId) AS followingsCount,
        JSON_ARRAYAGG(JSON_OBJECT('postId', p.id, 'desc', p.desc, 'img', p.img)) AS posts
      FROM user u
      LEFT JOIN follower f1 ON u.id = f1.followingId
      LEFT JOIN follower f2 ON u.id = f2.followerId
      LEFT JOIN post p ON u.id = p.userId
      WHERE u.username = ?
      GROUP BY u.id;
    `;

    try {
        db.query(query, [username], (err, result) => {
            if (err) {
                console.error("Error inserting post:", err.message);
                return res.status(500).json({ error: "Failed to insert post." });
            }
            console.log(result);
            if (!result || result.length === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
