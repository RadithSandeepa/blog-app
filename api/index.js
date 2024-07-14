import express from "express";
import cookieParser from "cookie-parser";
import postRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
    console.log("Connected to server");
})