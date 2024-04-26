const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3001;
const usersRouter = require("./routes/user.route");


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/users", usersRouter);


app.listen(port, () => {
  console.log(`Server users is running on http://localhost:${port}`);
});
