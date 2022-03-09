/**
 * @fileoverview application/user/exec/user.js
 * @typedef { import('mysql2/promise').Connection } connection
 */

const USER = require('../query/user');

/**
 * @description 이메일에 해당하는 실제 비번, 암호화된 입력 비번 로드
 * @param {Object} arg { conn, user }
 * @returns {Object}
 */
const select1 = async (arg) => {
    const { conn, user } = arg;

    const [[result]] = await conn.execute(USER.select1, user);

    return result;
};

module.exports = {
    select1
};
