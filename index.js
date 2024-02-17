import express from "express";
import mongoose from 'mongoose';

const conn = await mongoose.connect("mongodb://localhost:27017/login");

import { Login } from "./models/users.js";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
    
});

app.post('/check',async (req,res)=>{
    const {email,password} = req.body;
    // console.log({email,password});
    // res.send("heyyyy")
    const user = await Login.findOne({email,password})
    if(user){
        res.send("hello user ")
    }
    else{
        res.redirect('/')
        }
})

app.listen(3000, () => {
    console.log("app is running");
});
