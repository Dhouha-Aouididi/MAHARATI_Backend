class Comment {
    constructor({id ,userId, serviceId, commentText }) {
      this.id = id;
      // this.username = username;
      this.userId = userId;
      this.serviceId = serviceId;
      this.commentText = commentText;
    }
  }
  
  module.exports = Comment;
  