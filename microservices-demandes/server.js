const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sequelize = require('./config/database');
const demandeRoutes = require('./routes/demandeRoutes');

const app = express();
const PORT = process.env.PORT || 3009;

// Multer File upload settings
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  }
});

// Multer Mime Type Validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

app.use(bodyParser.json());
app.use('/public', express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: 'File upload error: ' + err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync()
  .then(() => {
    console.log('Connected to MySQL');
    app.listen(PORT, () => {
      console.log(`Server services is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

// Use Multer upload middleware before defining routes
// app.use(upload.single('image')); // Assuming 'image' is the field name in your form


app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
      res.status(200).json({ message: 'File uploaded successfully' });
    });
  });

app.use('/demandes', demandeRoutes);

module.exports = app;
