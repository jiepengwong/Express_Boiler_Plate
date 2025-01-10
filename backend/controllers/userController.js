
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const getUsers = async (req,res) => {
    try {
        const user = await User.findAll({attributes: { exclude: ['password', 'hashedPassword', 'salt'] }, // Exclude sensitive fields
        });
        res.status(200).json({message: 'Get all users',status: 'success', data: user });
    
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({message: 'Failed to retrieve users', status: 'error', error: error.message });
    }

 

  
}
export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Get user ID from URL parameters
  
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'hashedPassword', 'salt'] }, 
      });
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          status: 'error',
        });
      }
  
      res.status(200).json({
        message: 'User retrieved successfully',
        status: 'success',
        data: user,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        message: 'Failed to retrieve user',
        status: 'error',
        error: error.message,
      });
    }
  };

export const registerUser = async (req, res) => {
const registerPayload = req.body;

try {
    // Hashed password using bcrypt
    const newUser = await User.create({ 
    name: registerPayload.name, 
    username: registerPayload.username, 
    password: registerPayload.password,
    email: registerPayload.email
    });

    res.status(201).json({ message: 'User registered successfully!', user: newUser }); 
} catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
}
}
// Refresh token route
export const refreshToken =  async (req, res) => {
    const { refreshToken } = req.body;
  
    try {
      // 1. Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); 
  
      // 2. Find the user associated with the token
      const user = await User.findByPk(decoded.id);
  
      // 3. Check if the refresh token matches the one in the database
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
  
      // 4. Generate a new access token
      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { 
        expiresIn: '15min' 
      });
  
      // 5. (Optional) Generate a new refresh token and update the database
      // const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
      //   expiresIn: '30d' 
      // });
      // await user.update({ refreshToken: newRefreshToken });
  
      res.json({ accessToken /*, newRefreshToken */ }); 
  
    } catch (err) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  };


// User Authentication
export const loginUser = async (req,res) => {
    const loginPayload = req.body;  

    // Compare the password with the hashed password in the database

    const user = await User.findOne({ where: { username: loginPayload.username } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    console.log(loginPayload.password)
    console.log(user.password)
    // Compare the password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(loginPayload.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    else {
        // Generate a JWT token
        const accessToken = jwt.sign({ id: user.id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
          });
        const refreshToken = jwt.sign({ id: user.id}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
        // Store refresh token in the database
        await user.update({ refresh_token: refreshToken });
        res.status(200).json({ message: 'User logged in successfully', accessToken, refreshToken });
    }

    // Get details from the database itself

    
}


export const logoutUser =  async (req, res) => {
    const { refresh_token } = req.body; // Get the refresh token from the request
  
    try {
      // 1. (Optional) Verify the refresh token (if you want to be extra sure)
      // const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  
      // 2. Find the user associated with the token (you might need to adjust this based on how you store the token)
      const user = await User.findOne({ where: { refresh_token: refresh_token } }); 
  
      // 3. Clear the refreshToken field in the database
      if (user) {
        await user.update({ refresh_token: null });
      }
  
      // Client-side:
      // 1. Remove the JWT from local storage or cookies.
      // 2. (Optional) Redirect the user to the login page.
  
      res.json({ message: 'Logged out successfully' }); 
  
    } catch (err) {
      res.status(500).json({ message: 'Logout failed' });
    }
  };