/**
 * @fileoverview application/cmd/exec/sub_cmd.js
 */

const SUB_CMD = require('../query/sub_cmd');

/**
 * @description 서브 명령어 BULK INSERT
 * @param {Object} arg { conn, rows }
 * @returns {number} affectedRows
 */
const insert1 = async (arg) => {
    const { conn, rows } = arg;

    const [{ affectedRows }] = await conn.query(SUB_CMD.insert1, [rows]);

    return affectedRows;
};

module.exports = {
    insert1
};
