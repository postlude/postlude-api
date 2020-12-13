/**
 * @fileoverview application/user/svc/user_svc.js
 */

const { RSPNS } = require('@/config/dfn');
const USER = require('../exec/user');

/**
 * @description 로그인
 * @param {Object} arg { conn, user }
 * @returns {Object} {}
 */
exports.sgnn = async (arg) => {
    const { conn, user } = arg;

    const pwInfo = await USER.select1({ conn, user });

    if (pwInfo) {
        const { orgnPw, inptPw } = pwInfo;

        if (orgnPw === inptPw) {
            return true;
        } else {
            throw new CstmErr('INVALID PASSWORD', RSPNS.FAIL_INVLD_PW);
        }
    } else {
        throw new CstmErr('NOT EXISTED USER', RSPNS.FAIL_NOT_EXISTED_DATA);
    }
};
