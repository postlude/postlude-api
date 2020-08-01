require('module-alias/register');

const express = require('express');
const morgan = require('morgan');
const mysql = require('@/config/mysql');

const app = express();
const port = 3000;
const logFrmt = ':remote-addr - [:method] :url :status :response-time ms';

app.use(morgan(logFrmt));

app.use('/test', require('@/routes/test_router'));

app.listen(port, async () => {
    console.log('==================== [MyCmd WAS] ====================');
    console.log(`- Port : ${port}`);
    await mysql.testConn();
    console.log('=====================================================');
});
