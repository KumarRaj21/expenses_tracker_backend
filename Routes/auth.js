const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require("../Modals/user")

//signup
router.post("/register", async (req,res)=>{
try {
    const {email, username, password}= req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword});
    await user.save().then(()=>{
     res.status(200).json({message: "signup successfully"})
    })

} catch (error) {
    res.status(200).json({ message : " User already exists"})
}
})


//signin

router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: "Please Sign in First" });
      }
      
      const isPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!isPassword) {
        return res.status(400).json({ message: "Password incorrect" });
      }
      
      const { password, ...others } = user._doc;
      res.status(200).json({ others });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Something went wrong, please try again later" });
    }
  });
  
module.exports = router