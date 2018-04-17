const express = require('express');
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
})
const port = 3000;
const app = express();
const fs = require('fs');

const uploaded_files = [];
const uploadsPath = './public/uploads';
const html = {
    opening: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="style.css">
            <title>Document</title>
        </head>
        <body>
    `,
    header: `<div id=welcomeBox><h1>Welcome to Kenziegram!</h1></div?`,
    uploadForm: `
        <form method="post" action="http://localhost:3000/" enctype="multipart/form-data">
            <div>
                <label for="file">Choose a picture</label>
                <input type="file" id="file" name="myFile">
            </div>
            <div>
                <button type="submit">Upload Picture</button>
            </div>
        </form>
    `,
    images: ``,
    ending: `
            <script src="main.js"></script>
        </body>
        </html>
    `,
}

app.use(express.static('public'));
app.set('view engine', 'pug')

app.listen(port);

app.get('/', (req, res) => {
    let uploadedImages = "";
    fs.readdir(uploadsPath, function (err, items) {
        // for (let imagePath of items) {
        //     uploadedImages += `
        //         <img class="img" src="uploads/${ imagePath }">
        //     `
        // }
        // console.log(uploadedImages)
        // const picWindow = document.getElementById('pictureBox').appendChild(uploadedImages);

        res.render('index', {title: 'Kenziegram', images: items})
    });
});

app.post('/', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any

    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);

    res.redirect("/");
});

// const generateHTML = () => html.opening + html.header + html.uploadForm + html.images + html.ending;
