const csv = require('csvtojson');
const { xor } = require('lodash');

const { MANDATORY_HEADERS } = require('../config');
const parseCsv = (pathfile, options) => csv(options).fromFile(pathfile);

const validateHeaders = (inputHeaders) => {

    let isValid = false;
    const headers = MANDATORY_HEADERS.split(',');
    const inputHeadersUpperCase = inputHeaders.map(header => header.toUpperCase());

    let missingHeaders = [];
    headers.forEach(header => {
        isValid = inputHeadersUpperCase.includes(header)
        if (!isValid) {
            missingHeaders.push(header);
        }
    });
    return {isValid,missingHeaders};
}
module.exports = {
    parseCsv,
    validateHeaders,
};


