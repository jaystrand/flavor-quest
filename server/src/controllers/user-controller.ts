import {Request, Response } from 'express';
import {User} from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'anything'
//Get all users
//view all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
      // Add pagination for large user sets
   const limit = parseInt(req.query.limit as string) || 10;
   const offset = parseInt(req.query.page as string) || 0;
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        limit, //pagination limit
       offset: offset * limit, // pagination offset
      });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

// GET all Users by id
// view a specific user
export const getUserById = async (req: Request, res: Response) => {
    const {user_id} = req.params;
    try{
        const user = await User.findByPk(user_id,{
            attributes: {exclude: ['password']}
        });
        if(user){
            res.json(user);
        }else{
            res.status(404).json({message: 'User not found'})
        } 

    }catch(e:any){
        res.status(500).json({message: e.message});
    }
};

//POST
// Register User (Create a new user)
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,  // Store the hashed password
      });
  
      // Return success response
      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          user_id: newUser.user_id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Login User
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user.user_id , username: user.username}, JWT_SECRET_KEY, { expiresIn: '1h' });

    return res.json({
      message: 'Login successful',
      token,  // Send the token back to the client
      user: {
        user_id:user.user_id,
        username: user.username,  // Include username in response
        email: user.email,  // Include email if needed
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


// PUT 
// Update user details by ID (excluding password)
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { user_id } = req.params;
    const { username, email } = req.body;
  
    try {
      // Find the user by primary key (ID)
      const user = await User.findByPk(user_id);
  
      if (!user) {
        // Return a 404 response if the user is not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user details
      user.username = username || user.username;
      user.email = email || user.email;
  
      await user.save();
  
      // Return a success response with the updated user
      return res.json({
        message: 'User updated successfully',
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
        }
      });
    } catch (error: any) {
      // Return a 500 response in case of an error
      return res.status(500).json({ message: error.message });
    }
  };


// Get logged-in user's profile based on JWT token - added on Tuesday
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
   
    const userId = req.user?.user_id;  // Extract user ID from the JWT token
    const user = await User.findByPk(userId, { attributes: ['username', 'email'] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);  // Return user details
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};





// DELETE /Users/:id --> optional as of now





