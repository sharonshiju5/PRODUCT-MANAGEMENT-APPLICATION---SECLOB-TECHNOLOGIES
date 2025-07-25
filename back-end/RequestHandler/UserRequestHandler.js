import userSchema from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jrk from "jsonwebtoken"
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587 ,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "contacte169@gmail.com",
        pass: "ajviyfwmigdwdzxq",
    },
});

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

export async function forgetPassword(req,res) {

    console.log(req.body);
    
    try {
        // const randomNumber = generateSixDigitNumber();
            // send mail with defined transport object
            
            const email=req.body.email
            const info = await transporter.sendMail({
            from: 'contacte169@gmail.com', // sender address
            to: email, // list of receivers
            subject: "verify", // Subject line
            text: "Hello world?", // plain text body
            html: `<div style="padding: 20px; text-align: center;">
                <h2>Reset Your Password</h2>
                <p>Click the button below to reset your password:</p>
                <a href="http://localhost:5174/userchaingepass" 
                   style="background-color: #4CAF50; 
                          color: white; 
                          padding: 14px 20px; 
                          text-decoration: none; 
                          border-radius: 4px;
                          display: inline-block;
                          margin: 10px 0;">
                    Reset Password
                </a>
            </div>`, 
          });
        res.status(200).send({msg:"successfully sent "})
        
          console.log("Message sent: %s", info.messageId);
          
    } catch (error) {
        console.log(error);
        
    }   
}

export async function reset(req,res) {
    try {
        const{email,password}=req.body
        if(!(email&&password))
        return res.status(404).send({msg:"fields are empty"})
        const user=await userSchema.findOne({email})
        if(user==null)
        return res.status(404).send({msg:"email is not valid"})
              const hashedPassword = await bcrypt.hash(password, 10);

            console.log("Hashed Password:", hashedPassword);

            const updatedUser = await userSchema.findOneAndUpdate(
            { email },{ password: hashedPassword }

        );
        if (!updatedUser) {

            return res.status(404).json({ msg: "User not found" });

          }
    return res.status(200).json({ msg: "Password changed successfully" }); 
        console.log(sucess)
    } catch (error) {
        console.log(error);
    }
}

export async function Home(req,res){
    try {
        console.log("end point");
        console.log(req.user);
        const _id=req.user.userID;
        const user=await userSchema.findOne({_id});
        res.status(200).send({username:user.username,email:user.email,user_id:_id})
        
    } catch (error) {
        res.status(400).send({error})
    }
}


