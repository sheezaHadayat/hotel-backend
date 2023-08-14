var express = require('express');
var router = express.Router();

const User=require("../models/user")

// const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');



// Register
router.post('/register', async (req, res) => {
 
      const newuser = new User(        req.body
          // name: req.body.name,
          // email: req.body.email,
          // password: req.body.password,
      )
      try {
      // Hash the password before saving
    //   const saltRounds = 10;
    //   const hashedPassword = await bcrypt.hash(newuser.password, saltRounds);
    //   newuser.password = hashedPassword;

      const user = await newuser.save();
      res.send("User Registered Successfully")
    //   res.send({ user: savedUser._id });
  } catch (error) {
      res.status(400).json({ error  });
  }
});

// Login
router.post('/login', async (req, res) => {

      const { email, password } = req.body;
      try {
      const user = await User.findOne({ email :email,password:password });
      
      if (user){

        const temp={
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id:user._id
        }
        res.send(temp)
      
      
      }
        else
        {
        return res.status(400).json({ message: "Invalid credentials" });
        }
      // if (!user) {
      //     return res.status(400).json({ message: "Invalid credentials" });
      // }

      // Compare passwords
    //   const passwordsMatch = await bcrypt.compare(password, user.password);
    //   if (!passwordsMatch) {
    //       return res.status(400).json({ message: "Invalid credentials" });
    //   }

    //   // Generate and send JWT token
    //   const token = jwt.sign({ _id: user._id }, 'secretKey');
    //   res.header('auth-token', token).send(token);
  } catch (error) {
      res.status(400).json({ message: "Error during login", error: error.message });
  }
});

router.get('/getallusers', async (req, res) => {
 try {
     const users=await User.find()
     res.send(users)
 } catch (error) {
  res.status(400).json({error }); 
 }

})
module.exports = router; 