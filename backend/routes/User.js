
import express from 'express';
import Users from '../models/User.js';
const router = express.Router();
import bcrypt from 'bcrypt'


//Register
router.post("/register", async (req, res) => {
    // const newUser = new Users(req.body);
    // console.log(req.body);
    try {
        //generate password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })

        const savedUser = await newUser.save();
        //.save() is used to save the data to the database

        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

})
//login
router.post("/login", async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json("User not found, Register first");
    }
    var actualPassword = user.password;
    try {
        if (bcrypt.compareSync(req.body.password, actualPassword)) {
            res.status(200).json("login success");
        }
        else {
            res.status(404).json("Wrong Password");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
// const getUsers = 
//Delete

export default router;
