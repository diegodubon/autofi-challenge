const express = require("express");
const fs = require("fs");
const multer = require("multer");
const log4js = require("log4js");
const logger = log4js.getLogger("api.js");

const upload = multer({ dest: "tmp/csv/" });


const parseOptions = {
  delimiter: ";",
  trim: true
};

let {
    parseCsv,
    validateHeaders,
    getHeaders,
    parseData,
    toUpperCaseKeys
} = require("./helpers/helpers");


const { Router } = express;
const router = Router();

const Data = require('./models/Data');

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

    const { isValid, missingHeaders } = validateHeaders(getHeaders(csvData));

    if (!isValid) {
      return res.status(400).json({
        message: 'missing required headers',
        missingHeaders,
        code: 400
      });
      }

      const data = toUpperCaseKeys(csvData).map(row => {
          const newData = new Data({
              uuid: row.UUID,
              vin: row.VIN,
              zipCode: row.ZIP_CODE,
              price: row.PRICE,
              year: row.YEAR,
              mileage: row.MILEAGE,
              model: row.MODEL,
              make:row.MAKE,
              updateDate: row.UPDATE_DATE,
              createDate:row.CREATE_DATE,
              provider
          })
          return newData;
      })


      await Data.insertMany(data);

      res.json({message:'data saved!',code:200})
      
  } catch (error) {
    console.log({ error:error.message });

    res.json({ message: error.message });
  }
});


router.get("/", async (req, res) => {

    const { provider } = req.query;
    let query = {}

    if (provider) {
        query.provider = provider;
    }
    const data = await Data.find(query);
    res.json({data})
  
  });

module.exports = router;
