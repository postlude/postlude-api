require('module-alias/register');

global.ENV = process.env.NODE_ENV || 'development';
global.IS_PROD = ENV === 'production';
global.CstmErr = require('@/config/cstm_err');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('@/config/mysql');

const app = express();
const port = 3000;
const logFrmt = ':remote-addr - [:method] :url :status :response-time ms';

app.use(cors());
app.use(bodyParser.json());
app.use(morgan(logFrmt));

app.use('/dev-link', require('@/routes/dev_link_router'));

app.listen(port, async () => {
    console.log('==================== [POSTLUDE API] ====================');
    console.log(`- ENV : ${ENV}`);
    console.log(`- PORT : ${port}`);
    await mysql.testConn();
    console.log('=====================================================');
});
