/**
 * @fileoverview application/exec_stmt/exec/exec_stmt.js
 */

const EXEC_STMT = require('../query/exec_stmt');

/**
 * @description 실행문 1개 생성
 * @param {Object} arg { conn, execStmt }
 * @returns {number} insertId
 */
const insert1 = async (arg) => {
    const { conn, execStmt } = arg;

    const [{ insertId }] = await conn.execute(EXEC_STMT.insert1, execStmt);

    return insertId;
};

/**
 * @description 실행문 인덱스로 1개 로드
 * @param {Object} arg { conn, execStmtIdx }
 * @returns {Object}
 */
const select1 = async (arg) => {
    const { conn, execStmtIdx } = arg;

    const [[result]] = await conn.execute(EXEC_STMT.select1, { execStmtIdx });

    return result;
};

/**
 * @description 실행문 1개 수정
 * @param {Object} arg { conn, execStmt }
 */
const update1 = async (arg) => {
    const { conn, execStmt } = arg;

    await conn.execute(EXEC_STMT.update1, execStmt);
};

/**
 * @description 실행문 인덱스 1개 삭제
 * @param {Object} arg { conn, execStmtIdx }
 */
const delete1 = async (arg) => {
    const { conn, execStmtIdx } = arg;

    await conn.execute(EXEC_STMT.delete1, { execStmtIdx });
};

module.exports = {
    insert1,
    select1,
    update1,
    delete1
};
