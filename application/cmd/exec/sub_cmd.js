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

/**
 * @description 서브 명령어 UPSERT
 * @param {Object} arg { conn, subCmd }
 * @returns {number} affectedRows
 */
const insert2 = async (arg) => {
    const { conn, subCmd } = arg;

    const [{ affectedRows }] = await conn.query(SUB_CMD.insert2, subCmd);

    return affectedRows;
};

/**
 * @description 메인 명령어 인덱스에 해당하는 모든 서브 명령어 DELETE
 * @param {Object} arg { conn, mainCmdIdx }
 */
const delete1 = async (arg) => {
    const { conn, mainCmdIdx } = arg;

    await conn.query(SUB_CMD.delete1, { mainCmdIdx });
};

module.exports = {
    insert1,
    insert2,
    delete1
};
