import { db } from "../config/db.js"

export const addPost = (req, res) => {
    const { desc, img, userId } = req.body;
    console.log(req.body);

    // Validate input
    if (!desc || !userId) {
        return res.status(400).json({ error: "Description and userId are required." });
    }

    const query = `
      INSERT INTO post (\`desc\`, img, userId, createdAt, updatedAt)
      VALUES (?, ?, ?, NOW(), NOW())
    `;

    db.query(query, [desc, img || null, userId], (err, result) => {
        if (err) {
            console.error("Error inserting post:", err.message);
            return res.status(500).json({ error: "Failed to insert post." });
        }

        res.status(201).json({
            message: "Post added successfully!",
            postId: result.insertId,
        });
    });
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    const query = `SELECT post.* FROM post JOIN user ON post.userId = user.id WHERE post.id = ?`;

    try {
        // Log query and id for debugging
        console.log('Executing query:', query, 'with id:', id);

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
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
