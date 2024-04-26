const express = require("express"); //express framework for building REST apis
// const cors = require("cors");//cors provides Express middleware to enable CORS

const app = express();

// var corsOptions = {
//     origin:"http://localhost:4500"
// };

// app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

//simple route 
app.get("/", (req,res) => {
    res.json({message: "welcome to MAHARATI application."});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

//set PORT, listen for requests
const PORT = process.env.PORT || 3004;
app.listen(PORT, ()=>{
    console.log(`Server auth is running on port ${PORT}`);
});
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer"); // Import Multer
// const path = require("path");

// const app = express();
// const upload = multer({ dest: path.join(__dirname, "uploads") }); // Destination for uploaded files

// var corsOptions = {
//     origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database initialization
// const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync();

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to MAHARATI application." });
// });

// // Routes
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

// // Handle file upload
// app.post("/upload", upload.single("profile_image"), (req, res) => {
//     // Multer adds a "file" object to the request
//     const file = req.file;
//     if (!file) {
//         return res.status(400).send({ message: "Please upload a file." });
//     }
//     res.send({ message: "File uploaded successfully.", path: file.path });
// });

// // Set PORT and listen for requests
// const PORT = process.env.PORT || 3004;
// app.listen(PORT, () => {
//     console.log(`Server auth is running on port ${PORT}`);
// });
// function initial() {
//         Role.create({
//           id: 1,
//           name: "user"
//         });
       
//         Role.create({
//           id: 2,
//           name: "moderator"
//         });
       
//         Role.create({
//           id: 3,
//           name: "admin"
//         });
//       }
