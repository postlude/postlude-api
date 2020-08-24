/**
 * @fileoverview application/cmd/exec/optn.js
 */

const OPTN = require('../query/optn');

/**
 * @description 옵션 BULK INSERT
 * @param {Object} arg { conn, rows }
 * @returns {number} affectedRows
 */
const insert1 = async (arg) => {
    const { conn, rows } = arg;

    const [{ affectedRows }] = await conn.query(OPTN.insert1, [rows]);

    return affectedRows;
};

module.exports = {
    insert1
};
