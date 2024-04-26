const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    address: req.body.address,
    phone: req.body.phone,
    profile_image: req.body.profile_image,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          address: user.address,
          phone: user.phone,
          profile_image: user.profile_image,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// exports.signin = (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username,
//     },
//   })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }

//       const token = jwt.sign({ id: user.id }, config.secret, {
//         algorithm: "HS256",
//         allowInsecureKeySizes: true,
//         expiresIn: 86400, // 24 hours
//       });

//       var authorities = [];
//       user.getRoles().then((roles) => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].name.toUpperCase());
//         }

//         // Check if user has admin role
//         if (authorities.includes("ROLE_ADMIN")) {
//           // Generate admin token
//           const adminToken = jwt.sign({ id: user.id }, config.adminSecret, {
//             algorithm: "HS256",
//             allowInsecureKeySizes: true,
//             expiresIn: 86400, // 24 hours
//           });

//           res.status(200).send({
//             id: user.id,
//             username: user.username,
//             email: user.email,
//             name: user.name,
//             address: user.address,
//             phone: user.phone,
//             profile_image: user.profile_image,
//             roles: authorities,
//             accessToken: token,
//             adminToken: adminToken, // Include admin token
//           });
//         } else {
//           // Regular user without admin access
//           res.status(200).send({
//             id: user.id,
//             username: user.username,
//             email: user.email,
//             name: user.name,
//             address: user.address,
//             phone: user.phone,
//             profile_image: user.profile_image,
//             roles: authorities,
//             accessToken: token,
//           });
//         }
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };