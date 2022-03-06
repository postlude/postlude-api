/**
 * @fileoverview routes/middleware.js
 */

const geoip = require('geoip-country');
const jwt = require('jsonwebtoken');
const { RSPNS } = require('@/config/dfn');
const { SECRET } = require('@/config/jwt');

/**
  * @description 클라이언트 아이피 세팅 미들웨어
  */
const setClntIp = (req, res, next) => {
    const {
        headers: { 'x-forwarded-for': ip1 },
        connection: { remoteAddress: ip2 }
    } = req;

    req.clntIp = ip1 || ip2.replace(/[a-z|:]/gi, '');

    next();
};

/**
 * @description 아이피 체크 미들웨어. 한국만 허용
 */
const chckIp = (req, res, next) => {
    if (IS_PROD) {
        const { clntIp } = req;
        const ipInfo = geoip.lookup(clntIp);
        const country = ipInfo ? ipInfo.country : 'UNKNOWN';

        if (country === 'KR') {
            next();
        } else {
            console.log(`[middleware] chckIp - Forbidden : ${clntIp} (${country})`);
            res.status(403);
            res.send('Forbidden');
        }
    } else {
        next();
    }
};

/**
 * @description 토큰 체크 미들웨어
 * GET 요청 or 로그인 api 호출이 아닌 경우에는 토큰이 반드시 필요
 */
const chckTkn = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (req.method === 'GET' || req.originalUrl === '/user/sgnn') {
            next();
        } else if (authorization) {
            const { iat, exp, ...user } = jwt.verify(authorization, SECRET);
            req.decrypt = user;
            next();
        } else {
            throw new CstmErr('NO TOKEN');
        }
    } catch (err) {
        console.error(err);
        res.send(RSPNS.FAIL_TKN);
    }
};

module.exports = {
    setClntIp,
    chckIp,
    chckTkn
};
