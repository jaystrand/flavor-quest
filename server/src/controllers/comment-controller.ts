import { Request, Response } from 'express';
import { Comment } from '../models/comments.js';

// Get all comments for a specific recipe
export const getCommentsForRecipe = async (req: Request, res: Response): Promise<Response> => {
  const { recipe_id } = req.params;
  
  try {
    const comments = await Comment.findAll({ where: { recipe_id } });
    
    if (!comments.length) {
      return res.status(404).json({ message: 'No comments found for this recipe' });
    }

    return res.json(comments);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Add a new comment to a recipe
export const addCommentToRecipe = async (req: Request, res: Response): Promise<Response> => {
  const recipeID = parseInt(req.params.recipe_id,10);
  const  {user_id, text } = req.body;

  try {
    // Save the new comment
    const newComment = await Comment.create({
      recipe_id:recipeID,
      user_id,
      text,
    });

    return res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//may use it later - not decided
// // Delete a comment by ID
// export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
//   const { comment_id } = req.params;

//   try {
//     const comment = await Comment.findByPk(comment_id);

//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     await comment.destroy();
//     return res.json({ message: 'Comment deleted successfully' });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };