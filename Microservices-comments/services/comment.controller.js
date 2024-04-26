// const Comment = require("../models/comment");
// const db = require("./db");
// const helper = require("../helper");
// const config = require("../config");

// async function getMultiple(page = 1) {
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT id, user_id, service_id, username, commentText
//     FROM Comments LIMIT ?, ?`,
//     [offset, config.listPerPage]
//   );
//   const data = helper.emptyOrRows(rows);
//   const meta = { page };

//   return {
//     data,
//     meta,
//   };
// }

// async function getCommentById(commentId) {
//   const rows = await db.query(
//     `SELECT 
//     id, user_id, service_id, username, commentText
//     FROM Comments WHERE id = ?`,
//     [commentId]
//   );

//   return helper.emptyOrRows(rows)[0];
// }

// async function createComment(comment) {
//   const { userId, serviceId, username, commentText } = comment;

//   try {
//     const result = await db.query(
//       `INSERT INTO Comments (user_id, service_id, username, commentText) VALUES (?, ?, ?, ?)`,
//       [userId, serviceId, username, commentText]
//     );

//     if (result && result.insertId) {
//       const newCommentId = result.insertId;
//       const newComment = new Comment({ id: newCommentId, userId, serviceId, username, commentText });
//       return newComment;
//     } else {
//       throw new Error('Failed to get insert ID after comment creation');
//     }
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     throw new Error('Failed to create comment');
//   }
// }

// async function updateComment(commentId, updatedComment) {
//   const { username, userId, serviceId, commentText } = updatedComment;
//   await db.query(
//     `UPDATE Comments SET user_id=?, service_id=?, username=?, commentText=? WHERE id=?`,
//     [userId, serviceId, username, commentText, commentId]
//   );

//   return new Comment({ id: commentId, userId, serviceId, username, commentText });
// }

// async function deleteComment(commentId) {
//   await db.query(`DELETE FROM Comments WHERE id=?`, [commentId]);
//   return { message: "Comment deleted successfully" };
// }

// module.exports = {
//   getMultiple,
//   createComment,
//   getCommentById,
//   updateComment,
//   deleteComment,
// };
// const db = require("./db");
// const helper = require("../helper");
// const Comment = require("../models/comment");
// const config = require("../config");

// async function getAllComments() {
//   const sql = `
//     SELECT Comments.*, Users.username, Services.title AS serviceName
//     FROM Comments
//     INNER JOIN Users ON Comments.userId = Users.id
//     INNER JOIN Services ON Comments.serviceId = Services.id
//   `;
//   const comments = await db.query(sql);
//   return comments;
// }


// async function getCommentById(id) {
//   const sql = `
//     SELECT Comments.*, Users.username, Services.title AS serviceName
//     FROM Comments
//     INNER JOIN Users ON Comments.userId = Users.id
//     INNER JOIN Services ON Comments.serviceId = Services.id
//     WHERE Comments.id = ?
//   `;
//   const comment = await db.query(sql, [id]);
//   return comment[0];
// }

// // async function createComment(comment) {
// //   const { userId, serviceId, commentText } = comment;

// //   // Check if userId, serviceId, and commentText are defined and not null
// //   if (userId && serviceId && commentText) {
// //     try {
// //       const sql = `
// //         INSERT INTO Comments (userId, serviceId, commentText) VALUES (?, ?, ?)
// //       `;
// //       const result = await db.query(sql, [userId, serviceId, commentText]);

// //       if (result && result.insertId) {
// //         const newCommentId = result.insertId;
// //         const newComment = new Comment({ id: newCommentId, userId, serviceId, commentText });
// //         return newComment;
// //       } else {
// //         throw new Error('Failed to get insert ID after comment creation');
// //       }
// //     } catch (error) {
// //       console.error('Error creating comment:', error);
// //       throw new Error('Failed to create comment');
// //     }
// //   } else {
// //     throw new Error('error in commenting');
// //   }
// // }





// async function updateComment(commentId, updatedComment) {
//   const { userId, serviceId, commentText } = updatedComment;
//   const sql = `
//     UPDATE Comments SET user_id=?, service_id=?, commentText=? WHERE id=?
//   `;
//   await db.query(sql, [userId, serviceId, commentText, commentId]);

//   return new Comment({ id: commentId, userId, serviceId, commentText });
// }

// async function deleteComment(commentId) {
//   const sql = `DELETE FROM Comments WHERE id=?`;
//   await db.query(sql, [commentId]);
//   return { message: "Comment deleted successfully" };
// }

// module.exports = {
//   getAllComments,
//   getCommentById,
//   createComment,
//   updateComment,
//   deleteComment,
// };
const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// async function getMultipleComments(page = 1) {
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT id, userId, serviceId, commentText
//     FROM comments LIMIT ${offset},${config.listPerPage}`
//   );
//   const data = helper.emptyOrRows(rows);
//   const meta = { page };

//   return {
//     data,
//     meta,
//   };
// }
async function getMultipleComments() {
  const sql = `
    SELECT Comments.*, Users.username, Services.title AS serviceName
    FROM Comments
    INNER JOIN Users ON Comments.userId = Users.id
    INNER JOIN Services ON Comments.serviceId = Services.id
  `;
  const comments = await db.query(sql);
  return comments;
}

// async function getCommentById(commentId) {
//   const rows = await db.query(
//     `SELECT 
//     id, userId, serviceId, commentText
//     FROM comments WHERE id = ?`,
//     [commentId]
//   );

//   return helper.emptyOrRows(rows);
// }
async function getCommentById(id) {
  const sql = `
    SELECT Comments.*, Users.username, Services.title AS serviceName
    FROM Comments
    INNER JOIN Users ON Comments.userId = Users.id
    INNER JOIN Services ON Comments.serviceId = Services.id
    WHERE Comments.id = ?
  `;
  const comment = await db.query(sql, [id]);
  return comment[0];
}

async function create(comment) {
  if (!comment || !comment.userId || !comment.serviceId || !comment.commentText) {
    throw new Error("Missing required fields for comment creation");
  }

  const result = await db.query(
    `INSERT INTO comments 
    (userId, serviceId, commentText) 
    VALUES 
    (?, ?, ?)`,
    [comment.userId, comment.serviceId, comment.commentText]
  );

  let message = "Error in creating comment";

  if (result.affectedRows) {
    message = "Comment created successfully";
  }

  return { message };
}

async function updateComment(id, comment) {
  const values = [
    comment.userId || null,
    comment.serviceId || null,
    comment.commentText || null,
    id
  ];

  const result = await db.query(
    `UPDATE comments 
    SET userId=?, serviceId=?, commentText=?
    WHERE id=?`,
    values
  );

  let message = "Error in updating comment";

  if (result.affectedRows) {
    message = "Comment updated successfully";
  }

  return { message };
}

async function deleteComment(id) {
  const result = await db.query(
    `DELETE FROM comments WHERE id=${id}`
  );

  let message = "Error in deleting comment";

  if (result.affectedRows) {
    message = "Comment deleted successfully";
  }

  return { message };
}


module.exports = {
  getMultipleComments,
  getCommentById,
  create,
  updateComment,
  deleteComment
};

