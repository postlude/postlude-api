/**
 * @fileoverview routes/middleware.js
 */

const geoip = require('geoip-country');

/**
  * @description 클라이언트 아이피 세팅 미들웨어
  */
exports.setClntIp = (req, res, next) => {
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
exports.chckIp = (req, res, next) => {
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
