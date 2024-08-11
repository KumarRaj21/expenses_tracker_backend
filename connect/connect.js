const mongoose = require("mongoose");

const connect = async ()=>{
    try {
        await mongoose
        .connect("mongodb+srv://KonnaKumar:kumarraj@cluster0.vvfxp.mongodb.net/")
        .then(()=>{
            console.log("connected")
        })
    } catch (error) {
        console.log(error)
    }
}

connect()