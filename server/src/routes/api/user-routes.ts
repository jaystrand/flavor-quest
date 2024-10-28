import express from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    getProfile
    //,deleteUser - may do it later
} from '../../controllers/user-controller.js'

const userRouter = express.Router(); // the router instance

// Route to getproifle
userRouter.get('/profile',authenticateToken,getProfile)

// Route to all users
userRouter.get('/',getAllUsers);

//Route to get a specific used by id
userRouter.get('/:user_id',getUserById);

//Route to create/register a  usee 
userRouter.post('/',registerUser);

//Route to update a user by id
userRouter.put('/:user_id',updateUser);

// Route for getting the user's profile (requires authentication - but will add later)
// userRouter.get('/profile', getProfile);

//Route to delete a user by id - may be considered later
//userRouter.delete('/:user_id', deleteUser);

export default userRouter;