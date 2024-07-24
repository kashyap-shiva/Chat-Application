// controllers/userController.js
const userModal = require("../model/userModel"); // Ensure the path is correct
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json("These fields are mandatory");

    if (!validator.isEmail(email)) return res.status(400).json("Enter a valid email");
    if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong");

    let user = await userModal.findOne({ email });
    if (user) return res.status(400).json("Email already exists");
    
   // Register new user
    user = new userModal({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
};


const loginUser = async (req , res)=>{
     const {email , password} = req.body

    try {
        let user = await userModal.findOne({email})

        if(!user) return res.status(400).send("invalid email and password");

        const isValidPassword = await bcrypt.compare(password , user.password);

        if(!isValidPassword) return res.status(400).send("invalid email and password");
        const token = createToken(user._id);

       res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { registerUser ,loginUser };
