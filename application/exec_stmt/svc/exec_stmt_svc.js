/**
 * @fileoverview application/exec_stmt/svc/exec_stmt_svc.js
 */

const TAG_SVC = require('@/application/tag/svc/tag_svc');
const EXEC_STMT = require('../exec/exec_stmt');
const EXEC_STMT_TAG = require('../exec/exec_stmt_tag');

/**
 * @description 태그 연결 BULK INSERT
 * @param {Object} arg { conn, execStmtIdx, tagIdxAry }
 */
const bulkSaveTagLink = async (arg) => {
    const { conn, execStmtIdx, tagIdxAry } = arg;

    const row = [];
    tagIdxAry.forEach((tagIdx) => {
        row.push([execStmtIdx, tagIdx]);
    });

    await EXEC_STMT_TAG.insert1({ conn, row });
};

/**
 * @description 실행문 생성
 * @param {Object} arg { conn, execStmt, tagAry }
 */
exports.addExecStmt = async (arg) => {
    const { conn, execStmt, tagAry } = arg;

    const execStmtIdx = await EXEC_STMT.insert1({ conn, execStmt });

    const tagIdxAry = await TAG_SVC.saveTagAry({ conn, tagAry });

    await bulkSaveTagLink({ conn, execStmtIdx, tagIdxAry });
};

/**
 * @description 실행문 1개 로드
 * @param {Object} arg { conn, execStmtIdx }
 * @returns {Object} { execStmt, tagAry }
 */
exports.getExecStmtByIdx = async (arg) => {
    const { conn, execStmtIdx } = arg;

    const { tagAry, ...execStmt } = await EXEC_STMT.select1({ conn, execStmtIdx });

    return {
        execStmt,
        tagAry: JSON.parse(tagAry)
    };
};

/**
 * @description 실행문 삭제
 * @param {Object} arg { conn, execStmtIdx }
 */
exports.rmExecStmtByIdx = async (arg) => {
    const { conn, execStmtIdx } = arg;

    await EXEC_STMT_TAG.delete1({ conn, execStmtIdx });

    await EXEC_STMT.delete1({ conn, execStmtIdx });
};
