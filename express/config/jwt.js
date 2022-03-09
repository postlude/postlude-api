/**
 * @fileoverview config/jwt.js
 * JWT 관련 설정 값
 */

const { JWT_SECRET } = require('@/config/env');

module.exports = {
    SECRET: JWT_SECRET || '123456789',
    OPTN: { expiresIn: '1d' } // [default] algorithm: 'HS256'
};
