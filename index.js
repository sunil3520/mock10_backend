const express=require("express");
const connection=require("./db")
require("dotenv").config()
const {BookRoutes}=require('./routes/book.routes')

const {UserRoutes}=require("./routes/user.routes")
const app=express();

//middleware
app.use(express.json())


app.use("/api",UserRoutes);
app.use("/api",BookRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})