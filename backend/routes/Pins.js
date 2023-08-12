
import express from 'express';
import Pins from '../models/Pins.js';
const router = express.Router();

//Create
router.post("/", async (req, res) => {
    const newPin = new Pins(req.body);

    try {
        const savedPin = await newPin.save();
        //.save() is used to save the data to the database

        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }

})
//Get
router.get("/", async (req, res, next) => {
    try {
        const pins = await Pins.find();
        // using param id of the object is found
        res.status(200).json(pins);
    } catch (err) {
        next(err);
    }
});
// const getPins = 
//Delete

export default router;
