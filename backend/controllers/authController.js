const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
      const { name, email, password } = req.body; //  Change `username` → `name`
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username: name, email, password: hashedPassword }); //  Use `name`
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
  } catch (error) { 
      res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
 
      if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required!" });
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
