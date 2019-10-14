const express = require('express');
const app = express();

let { PORT } = require('./config');

app.listen(PORT, () => console.log(`Running Api server on port:${PORT}`));
