
const express=require("express");
const bcrypt=require("bcrypt");

const UserRoutes=express.Router();
const {UserModel}=require("../models/user.models")
const jwt=require("jsonwebtoken");

UserRoutes.post("/register",async(req,res)=>{
   const {name,email,password,isAdmin}=req.body;
   try{
       const user=await UserModel.findOne({email});
       if(user){
          res.status(200).send({"msg":"User already Exist"})
       }else{
        bcrypt.hash(password, 4, (err, hash) =>{
            const user=new UserModel({name,email,password:hash,isAdmin});
            user.save();
            res.status(200).send({"msg":"Registration Successfull"})
        });
       }
   }catch(err){
    res.status(400).send({"err":err.message})
   }
})


UserRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
                if(result){
                    res.status(200).send({"msg":"Login Successfull",token:jwt.sign({userId:user._id,isAdmin:user.isAdmin},"private_key")})
                }else{
                    res.status(200).send({"msg":"Wrong Password"})
                }
            });
        }else{
            res.status(200).send({"msg":"User not exit Please signup first"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={UserRoutes};