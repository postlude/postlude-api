/**
 * @fileoverview application/exec_stmt/exec/exec_stmt_tag.js
 */

const EXEC_STMT_TAG = require('../query/exec_stmt_tag');

/**
 * @description 실행문 태그 연결 BULK INSERT
 * @param {Object} arg { conn, row }
 */
const insert1 = async (arg) => {
    const { conn, row } = arg;

    await conn.query(EXEC_STMT_TAG.insert1, [row]);
};

/**
 * @description 실행문 인덱스로 연결된 태그 삭제
 * @param {Object} arg { conn, execStmtIdx }
 */
const delete1 = async (arg) => {
    const { conn, execStmtIdx } = arg;

    await conn.execute(EXEC_STMT_TAG.insert1, { execStmtIdx });
};

module.exports = {
    insert1,
    delete1
};
