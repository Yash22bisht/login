import mongoose from "mongoose";

const loginschema = new mongoose.Schema({
    email:String,
    password: String
})

export const Login = mongoose.model("login_id",loginschema);
