import { Router } from "express";
import apiRoutes from './api/index.js';
 import authRoutes from './auth-routes.js';
//authentication import from middleware
// import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Route for authentication (register and login)
router.use('/auth',authRoutes)

//prefix all routes in api dir with /api -> locahost:port/api 

//todo add authentication-middleware
router.use('/api',apiRoutes)//authenticateToken,apiRoutes)

export default router;