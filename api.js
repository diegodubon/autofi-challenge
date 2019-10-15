const express = require("express");
const fs = require("fs");
const multer = require("multer");
const log4js = require("log4js");
const logger = log4js.getLogger("api.js");
const csv = require("csvtojson");
const upload = multer({ dest: "tmp/csv/" });
const { keys } = require("lodash");

const parseOptions = {
  delimiter: ";",
  trim: true
};

let { LOGGER_LEVEL } = require("./config");

let { parseCsv, validateHeaders } = require("./helpers/parseCsv");
logger.level = LOGGER_LEVEL;

const { Router } = express;
const router = Router();

router.post("/uploadCsv", upload.single("file"), async (req, res) => {
  const { provider } = req.body;

  logger.info({ provider });

  if (!provider) {
    return res.status(400).json({
      message: "provider field is required.",
      code: 400
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "file input is required.",
      code: 400
    });
  }

  const csvFilePath = req.file.path;

  try {
    const csvData = await parseCsv(csvFilePath, parseOptions);

    //delete temp csv on memory
    fs.unlinkSync(csvFilePath);

    const getHeaders = csvData => Object.keys(csvData[0]);

    const { isValid, missingHeaders } = validateHeaders(getHeaders(csvData));

    if (!isValid) {
      return res.status(400).json({
        message: "missing required headers",
        missingHeaders,
        code: 400
      });
    }
    res.json({ isValid, missingHeaders });
  } catch (error) {
    console.log({ error });

    res.json({ message: error.message });
  }

  // csv(parseOptions)
  //     .fromFile(csvFilePath)
  //     .then(json => {
  //         console.log(json);
  //         fs.unlinkSync(csvFilePath);
  //         res.json({
  //             message: 'upload file',
  //         });
  //     }).catch(error => {
  //         console.log({ error })
  //         res.json({
  //             message: 'Error on procesing the file',
  //         });
  // });
});

module.exports = router;
