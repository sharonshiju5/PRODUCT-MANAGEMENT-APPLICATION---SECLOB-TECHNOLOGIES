import userSchema from "../models/user.model.js"
import bcrypt from "bcrypt"
import jrk from "jsonwebtoken"
// import nodemailer from "nodemailer";

export async function adduser(req,res){
    try {
        const{username,email,password}=req.body
        console.log(req.body);

        if (!(username &&email && password )) {
            return res.status(400).send({ msg: "Fields are empty" });
        }
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ msg: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        await userSchema.create({ username, email, password: hashedPassword, });
    
        return res.status(201).send({ msg: "Successfully created",});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ msg: "Internal Server Error", error: error.message });
    }
}

