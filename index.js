import express from "express";
import 'dotenv/config'
import mongoose from 'mongoose';
import { Login } from "./models/users.js";
import bodyParser from "body-parser";

const Mongo_url = process.env.MONGODB_URL;
// const Mongo_url = 'mongodb://localhost:27017/login'

// Connect to the MongoDB server using mongoose
mongoose.connect(Mongo_url).then(()=>{
    console.log("connected");
})

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/check', async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });


    // const log = new Login({
    //     email : email,
    //     password: password
    // })
    // log.save();
    // res.send("user registered")

    try {
        // Use mongoose to query the database
        const user = await Login.findOne({ email, password });

        if (user) {
            res.send("Hello user");
        } else {
            res.send("No user found");
        }
    } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
