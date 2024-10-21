import express from 'express';

import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser
    //,deleteUser - may do it later
} from '../../controllers/user-controller.js'

const userRouter = express.Router(); // the router instance

// Route to all users
userRouter.get('/',getAllUsers);

//Route to get a specific used by id
userRouter.get('/:user_id',getUserById);

//Route to create/register a  usee 
userRouter.post('/',registerUser);

//Route to update a user by id
userRouter.put('/:user_id',updateUser);

//Route to delete a user by id - may be considered later
//userRouter.delete('/:user_id', deleteUser);

export default userRouter;