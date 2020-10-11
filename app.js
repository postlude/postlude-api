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

// app.use('/main-cmd', require('@/routes/main_cmd_router'));
app.use('/dev-doc', require('@/routes/dev_doc_router'));

app.listen(port, async () => {
    console.log('==================== [MyCmd WAS] ====================');
    console.log(`- ENV : ${ENV}`);
    console.log(`- PORT : ${port}`);
    await mysql.testConn();
    console.log('=====================================================');
});
