import express from "express";
import dotenv from 'dotenv';

dotenv.config();


const app = express();


//middlewares
app.use(express.json());

app.listen(8800, () => {
    console.log("Connected to server");
})