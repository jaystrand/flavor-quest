import express from 'express';
import { registerUser, loginUser } from '../controllers/user-controller.js';  // Import the controller functions

const authRouter = express.Router();  // Create a new Router instance

// Route to register a new user
authRouter.post('/register', registerUser);

// Route to log in an existing user
authRouter.post('/login', loginUser);

export default authRouter;  // Export the router
