require('module-alias/register');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('@/config/mysql');

global.CstmErr = require('@/config/cstm_err');

const app = express();
const port = 3000;
const logFrmt = ':remote-addr - [:method] :url :status :response-time ms';

app.use(bodyParser.json());
app.use(morgan(logFrmt));

app.use('/cmd', require('@/routes/cmd_router'));
app.use('/test', require('@/routes/test_router'));

app.listen(port, async () => {
    console.log('==================== [MyCmd WAS] ====================');
    console.log(`- Port : ${port}`);
    await mysql.testConn();
    console.log('=====================================================');
});
