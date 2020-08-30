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

/**
 * @description 명령어 타입과 인덱스에 해당하는 옵션 전부 삭제
 * @param {Object} arg { conn, ty, cmdIdx }
 */
const delete1 = async (arg) => {
    const { conn, ty, cmdIdx } = arg;

    await conn.query(OPTN.delete1, { ty, cmdIdx });
};

module.exports = {
    insert1,
    delete1
};
