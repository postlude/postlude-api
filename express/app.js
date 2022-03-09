require('module-alias/register');
const { NODE_ENV } = require('@/config/env');

const ENV = NODE_ENV || 'development';
global.IS_PROD = ENV === 'production';
global.CstmErr = require('@/config/cstm_err');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('@/config/mysql');
const { setClntIp, chckIp, chckTkn } = require('@/routes/middleware');

const app = express();
const port = 3000;

app.use(setClntIp);
app.use(chckIp);
app.use(cors());
app.use(express.json());
app.use(morgan((tkn, req, res) => {
    const ip = req.clntIp;
    const method = tkn.method(req, res);
    const url = tkn.url(req, res);
    const status = tkn.status(req, res);
    const rspnsTime = tkn['response-time'](req, res);
    return `${ip} - [${method}] ${url} ${status} ${rspnsTime} ms`;
}));
app.use(chckTkn);

app.use('/dev-link', require('@/routes/dev_link_router'));
app.use('/tag', require('@/routes/tag_router'));
app.use('/exec-stmt', require('@/routes/exec_stmt_router'));
app.use('/user', require('@/routes/user_router'));

app.listen(port, async () => {
    console.log('==================== [POSTLUDE API] ====================');
    console.log(`ENV : ${ENV}`);
    console.log(`PORT : ${port}`);
    await mysql.testConn();
    console.log('========================================================');
});
