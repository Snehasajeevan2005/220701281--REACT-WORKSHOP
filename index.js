const express=require("express");
const morgan=require("morgan");
const pg=require("pg");
const cors=require("cors");
const bodyParser=require("body-parser");
require("dotenv").config();
const app=express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
const db=new pg.Client({
    host:"localhost",
    port:5432,
    database:"finance_tracker",
    user:"postgres",
    password:"sneha@200"


});
db.connect().then(()=>{
    console.log("database Connected");
});

app.get("/",(req,res)=>{
    res.send("Hello World");
});
 
//thunderclinet similar to postname.
//new request
// post localhost:3001/add
// then body then form encoded then send
//go to postrsql  right click table, view or edit and c the inserted

app.post("/add",async(req,res)=>{
    const data=req.body;
    await db.query(`INSERT INTO History(description,mode,amount) values($1,$2,$3)`,[data.description,data.mode,data.amount])
    res.status(201).send("Record Inserted successfully");
});
app.get("/transactions",async(req,res)=>{
    const result=await db.query(
        "SELECT * from history"
    );
    res.send(result.rows);
})

app.listen(3001,()=>{
    console.log("Server started at port 3001");
});

