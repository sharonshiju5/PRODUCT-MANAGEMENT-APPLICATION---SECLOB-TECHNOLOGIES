import userSchema from "../models/user.model.js"
import bcrypt from "bcrypt"
import jrk from "jsonwebtoken"
// import nodemailer from "nodemailer";
const {sign}=jrk
export async function adduser(req,res){
    try {
        const{username,email,password}=req.body
        // console.log(req.body);

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

export async function loginuser(req,res) {
    try {
        const{email,password}=req.body
        console.log(req.body);

        if(!(email&&password))
        return res.status(404).send({msg:"fields are empty"})

        const user=await userSchema.findOne({email})
        if(user==null)
        return res.status(404).send({msg:"email is not valid"})
        const sucess=await bcrypt.compare(password,user.password) 
        console.log(sucess)
        if(!sucess)
            return res.status(404).send({msg:"password incorrept"})

        const token=await sign({userID:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
        res.status(200).send({msg:"successfully loged in ",token})
    } catch (error) {
        console.log(error);
    }
}