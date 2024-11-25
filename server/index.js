const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const friendRoutes = require('./routes/friendRoutes');
const userRoutes = require('./routes/userRoutes');
const upload = require('./config/upload');
const cloudinary = require('./config/cloudinaryConfig');
const setupSocket = require('./socket');

const app = express();
const server = require('http').createServer(app);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ error: 'No file selected!' });
      } else {
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          res.status(200).json({
            fileName: req.file.filename,
            filePath: result.secure_url
          });
        } catch (error) {
          res.status(500).json({ error: 'Cloudinary upload failed' });
        }
      }
    }
  });
});

app.use('/uploads', express.static('uploads'));
app.use('/api', router);
app.use('/api', friendRoutes);
app.use('/api', userRoutes);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server running at " + PORT);
    });
    setupSocket(server);
});