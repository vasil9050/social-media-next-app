import express from 'express'
const app = express();
import userRoutes from './routes/users.js';
import postRoutes from './routes/post.js';
import likeRoutes from './routes/like.js';
import followRoutes from './routes/follow.js';

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/like', likeRoutes)
app.use('/api/follow', followRoutes)

app.listen(8080, () => {
    console.log("Server started on 8080");

})