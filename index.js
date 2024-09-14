const express = require("express");
const app = express();
const cors = require("cors");
require("./connect/connect");
const auth = require("./Routes/auth");
const transaction = require("./Routes/transaction"); 


app.use(express.json());
app.use(cors());
app.use("/api/k1", auth);
app.use("/api/k2", transaction);

app.get("/",(req,res)=>{
    res.send("<h1>Hey it is backend of Expenses Tracker</h1>")
})


app.listen(1001, ()=>{
    console.log("listening"); 
})

