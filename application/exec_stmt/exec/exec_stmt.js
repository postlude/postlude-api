/**
 * @fileoverview application/exec_stmt/exec/exec_stmt.js
 * @typedef { import('mysql2/promise').Connection } connection
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
 * @description 태그 검색시 실행문 전체 카운트
 * @param {Object} arg { conn, srchAry }
 * @returns {number} cnt
 */
const select2 = async (arg) => {
    const { conn, srchAry } = arg;

    const [[{ cnt }]] = await conn.query(EXEC_STMT.select2, [srchAry, srchAry.length]);

    return cnt;
};

/**
 * @description 실행문 인덱스 태그 검색
 * @param {Object} arg { conn, srchAry, offset, limit }
 * @returns {Array}
 */
const select3 = async (arg) => {
    const {
        conn, srchAry, offset, limit
    } = arg;

    const [result] = await conn.query(EXEC_STMT.select3, [srchAry, srchAry.length, offset, limit]);

    return result;
};

/**
 * @description 인덱스 배열로 실행문 로드
 * @param {Object} arg { conn, execStmtIdxAry }
 * @returns {Array}
 */
const select4 = async (arg) => {
    const { conn, execStmtIdxAry } = arg;

    const [result] = await conn.query(EXEC_STMT.select4, [execStmtIdxAry]);

    return result;
};

/**
 * @description 제목 검색시 실행문 전체 카운트
 * @param {Object} arg { conn, title }
 * @returns {number} cnt
 */
const select5 = async (arg) => {
    const { conn, title } = arg;

    const [[{ cnt }]] = await conn.execute(EXEC_STMT.select5, { title: `%${title}%` });

    return cnt;
};

/**
 * @description 실행문 제목 검색
 * @param {Object} arg { conn, title, offset, limit }
 * @returns {Array}
 */
const select6 = async (arg) => {
    const {
        conn, title, offset, limit
    } = arg;

    const [result] = await conn.execute(EXEC_STMT.select6, {
        title: `%${title}%`,
        offset,
        limit
    });

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
    select2,
    select3,
    select4,
    select5,
    select6,
    update1,
    delete1
};
