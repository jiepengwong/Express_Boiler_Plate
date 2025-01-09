
import User from '../models/User.js';
export const getUsers = (req,res) => {
    res.send('Users Route');
}

export const loginUser = (req,res) => {
    const loginPayload = req.body;  

    // Get details from the database itself

    
}

export const registerUser = async (req, res) => {
    const registerPayload = req.body;
    try {
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