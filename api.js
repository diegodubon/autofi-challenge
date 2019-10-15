const express = require('express');
const fs = require('fs');
const multer = require('multer');
const csv = require('fast-csv');

const upload = multer({ dest: 'tmp/csv/' });

const { Router } = express;
const router = Router();

router.post('/uploadCsv', upload.single('file'), (req, res) => {
    const fileRows = [];
    csv.fromPath(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows)
      fs.unlinkSync(req.file.path);   // remove temp file
      //process "fileRows" and respond
    })
    res.json({
        message: 'upload file',
    });
});

module.exports = router;
