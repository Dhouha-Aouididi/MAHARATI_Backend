const express = require("express");
const app = express();
const port = 3007;
const commentRouter = require("./routes/comment.route");

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to test if the server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Route for comments using the commentRouter
app.use("/comments", commentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({ message: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
