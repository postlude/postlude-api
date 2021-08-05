/**
 * @fileoverview application/user/svc/user_svc.js
 */

const jwt = require('jsonwebtoken');
const { RSPNS } = require('@/config/dfn');
const { SECRET, OPTN } = require('@/config/jwt');
const USER = require('../exec/user');

/**
 * @description jwt 토큰 발급
 * @param {Object} arg { idx, email }
 * @returns {string} tkn
 */
const issuTkn = async (arg) => {
    const { idx, email } = arg;

    const tkn = await jwt.sign({ idx, email }, SECRET, OPTN);

    return tkn;
};

/**
 * @description 로그인
 * @param {Object} arg { conn, user }
 * @returns {Object} {}
 */
const sgnn = async (arg) => {
    const { conn, user } = arg;

    const pwInfo = await USER.select1({ conn, user });

    if (pwInfo) {
        const { email } = user;
        const { idx, orgnPw, inptPw } = pwInfo;

        if (orgnPw === inptPw) {
            const tkn = await issuTkn({ idx, email });
            return tkn;
        } else {
            throw new CstmErr('INVALID PASSWORD', RSPNS.FAIL_INVLD_PW);
        }
    } else {
        throw new CstmErr('NOT EXISTED USER', RSPNS.FAIL_NOT_EXISTED_DATA);
    }
};

module.exports = {
    sgnn
};
