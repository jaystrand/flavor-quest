import express from 'express';
import { getCommentsForRecipe, 
    addCommentToRecipe, 
    //deleteComment //may add it later
} from '../../controllers/comment-controller.js';

const commentsRouter = express.Router();

// Route to get all comments for a specific recipe
commentsRouter.get('/recipes/:recipe_id/comments', getCommentsForRecipe);

// Route to add a new comment to a recipe
commentsRouter.post('/recipes/:recipe_id/comments', addCommentToRecipe);

// // Route to delete a comment by ID
// commentsRouter.delete('/comments/:comment_id', deleteComment); // may add it later

export default commentsRouter;