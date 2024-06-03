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
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.destroy();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



