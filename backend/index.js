import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import pinsRoute from './routes/Pins.js';
import userRoute from './routes/User.js';
const app = express();
dotenv.config();

app.use(express.json());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to database");
    } catch (error) {
        throw error;
    }
}

app.use("/pins", pinsRoute);
app.use("/users", userRoute);


app.listen(8080, () => {
    connect();
    console.log("connected to backend");
})