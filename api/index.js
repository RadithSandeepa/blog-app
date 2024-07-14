import express from "express";


const app = express();


//middlewares
app.use(express.json());

app.listen(8800, () => {
    console.log("Connected to server");
})