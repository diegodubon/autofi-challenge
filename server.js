const express = require('express');

const morgan = require('morgan');
const log4js = require('log4js');
const bodyParser = require('body-parser')
const logger = log4js.getLogger('server.js');
const app = express();

let { PORT, LOGGER_LEVEL} = require('./config');

//SET LOGGER LEVEL
logger.level = LOGGER_LEVEL;

app.use(express.json({}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(morgan('dev'))


const uploadRouter = require('./api');

app.use('/api/v1/', uploadRouter)

app.get('/test', (req,res) => {
    res.json({message:'asdasd'})
})

app.listen(PORT, () => logger.info(`Running Api server on port:${PORT}`));
