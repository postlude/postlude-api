/**
 * @fileoverview application/cmd/exec/main_cmd.js
 */

const MAIN_CMD = require('../query/main_cmd');

/**
 * @description 메인 명령어 insert
 * @param {Object} arg { conn, mainCmd }
 * @returns {number} mainCmdIdx
 */
const insert1 = async (arg) => {
    const { conn, mainCmd } = arg;

    const [{ insertId }] = await conn.execute(MAIN_CMD.insert1, mainCmd);

    return insertId;
};

module.exports = {
    insert1
};
