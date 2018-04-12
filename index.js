const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/' })
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('public'));

app.listen(port);

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.end("Uploaded file!");
  });