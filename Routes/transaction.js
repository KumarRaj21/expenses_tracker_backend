const router = require("express").Router();
const Transaction = require("../Modals/transaction")
const User = require("../Modals/user")

//create-transaction

router.post("/add-transaction", async (req, res) => {
    try {
        const { amount, category, date, type, id } = req.body
        const existingUser = await User.findById(id)
        if (existingUser) {
            const transaction = new Transaction({ amount, category, date, type, user: existingUser._id });
            await transaction.save().then(() => res.status(200).json({ transaction }));
            existingUser.transaction.push(transaction);
            await existingUser.save();
        }
    } catch (error) {
        console.log(error)
    }
})

//update-transaction 

router.put("/update-transaction/:id", async (req, res) => {
    try {
        const { amount, category, date, type } = req.body
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { amount, category, date, type })
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        await transaction.save();
        res.status(200).json({ transaction });

    } catch (error) {
        console.log(error)
    }
})

//delete-transaction

router.delete("/delete-transaction/:id", async (req, res) => {
    try {
        const { id } = req.body
        const transactionId =  req.params.id
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { transaction: transactionId} })
        if (existingUser) {
            await Transaction.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "task deleted" }))
        } else{
            res.status(200).json({message:"transaction not found"})
        }

    } catch (error) {
        console.log(error)
    }
})

//get-transactions

router.get("/get-transaction/:id", async (req, res) => {
    const transaction = await Transaction.find({ user: req.params.id }).sort({ createdAt: -1 })

    if (transaction.length !== 0) {
        res.status(200).json({ transaction: transaction })
    }
    else {
        res.status(200).json({ "message": "No tasks" })
    }

})


module.exports = router