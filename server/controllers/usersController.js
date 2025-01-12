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

    const query = `SELECT * FROM user WHERE id = ?`;

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

    if (!id) {
        return res.status(400).json({ error: "ID is a required field." });
    }

    const query = `
        UPDATE user 
        SET 
            username = ?, 
            avatar = ?, 
            cover = ?, 
            name = ?, 
            surname = ?, 
            description = ?, 
            city = ?, 
            school = ?, 
            work = ?, 
            website = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            username || null,
            avatar || null,
            cover || null,
            name || null,
            surname || null,
            description || null,
            city || null,
            school || null,
            work || null,
            website || null,
            id,
        ],
        (err, results) => {
            if (err) {
                console.error("Error updating user:", err.message);
                return res.status(500).json({ error: "Database error occurred." });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found." });
            }

            res.status(200).json({ message: "User updated successfully." });
        }
    );
};
