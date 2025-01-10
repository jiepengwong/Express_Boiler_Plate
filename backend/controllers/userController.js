
import User from '../models/User.js';
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