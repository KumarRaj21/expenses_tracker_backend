const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    user : [
        {
          type: mongoose.Types.ObjectId,
          ref: "User"
        }
    ]
})

module.exports = mongoose.model('Transaction', transactionSchema)