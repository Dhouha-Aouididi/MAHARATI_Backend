const { Comment} = require('../model/index').models; 
const { User} = require('../model/index').models;
const { Service } = require('../model/index').models;



// Controller to get all comments
exports.getAllComments = async (req, res) => {
  try {
    // Find all comments
    const comments = await Comment.findAll();

    return res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Failed to fetch comments.' });
  }
};


// Controller to handle comment creation
// exports.createComment = async (req, res) => {
//   const { user_id, service_id, commentText, rating } = req.body;

//   try {
//     // Check if the user and service exist
//     const user = await User.findByPk(user_id); 
//     const service = await Service.findByPk(service_id);

//     if (!user || !service) {
//       return res.status(404).json({ error: 'User or service not found.' });
//     }

//     // Create the comment
//     const newComment = await Comment.create({ user_id, service_id, commentText, rating });

//     return res.status(201).json(newComment);
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     return res.status(500).json({ error: 'Failed to create comment.' });
//   }
// };
// Controller to handle comment creation
exports.createComment = async (req, res) => {
  const { user_id, service_id, commentText, rating } = req.body;

  try {
    console.log('Received request to create comment:', req.body);

    // Check if the user and service exist
    const user = await User.findByPk(user_id);
    const service = await Service.findByPk(service_id);

    if (!user || !service) {
      console.error('User or service not found.');
      return res.status(404).json({ error: 'User or service not found.' });
    }

    // Create the comment
    const newComment = await Comment.create({ user_id, service_id, commentText, rating });

    console.log('New comment created:', newComment);

    return res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ error: 'Failed to create comment.', details: error.message });
  }
  
};



// Controller to get comments for a specific service
exports.getCommentsForService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Find comments for the specified service ID
    const comments = await Comment.findAll({
      where: { service_id: serviceId },
      include: [{ model: User, attributes: ['id', 'username'] }], // Include user information in the result
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Failed to fetch comments.' });
  }
};

// Controller to delete a comment by ID
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id; // Supposons que l'ID de l'utilisateur actuel est accessible via req.user

  try {
    // Trouver le commentaire par ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      console.error('Comment not found.');
      return res.status(404).json({ error: 'Comment not found.' });
    }

    if (comment.user_id !== userId) {
      console.error('User not authorized to delete this comment.');
      return res.status(403).json({ error: 'User not authorized to delete this comment.' });
    }

    // Supprimer le commentaire
    await comment.destroy();

    console.log('Comment deleted:', commentId);

    return res.status(204).send(); // Réponse sans contenu
  } catch (error) {
    console.error('Error deleting comment:', error);
    return res.status(500).json({ error: 'Failed to delete comment.', details: error.message });
  }
};


