
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
  require('dotenv').config();
}
module.exports = {
  PORT: process.env.PORT || 80,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug',
  DB_URI: process.env.DB_URI,
  MANDATORY_HEADERS: 'UUID,VIN,ZIP_CODE,MODEL,MAKE,YEAR,PRICE,MILEAGE,UPDATE_DATE,CREATE_DATE',
};
