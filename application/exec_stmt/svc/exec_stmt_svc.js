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
const addExecStmt = async (arg) => {
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
const getExecStmtByIdx = async (arg) => {
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
const rmExecStmtByIdx = async (arg) => {
    const { conn, execStmtIdx } = arg;

    await EXEC_STMT_TAG.delete1({ conn, execStmtIdx });

    await EXEC_STMT.delete1({ conn, execStmtIdx });
};

/**
 * @description 실행문 수정
 * @param {Object} arg { conn, execStmt, tagAry }
 */
const mdfyExecStmt = async (arg) => {
    const { conn, execStmt, tagAry } = arg;
    const { idx: execStmtIdx } = execStmt;

    // [STEP 1] 실행문 수정
    await EXEC_STMT.update1({ conn, execStmt });

    // [STEP 2] 기존 연결 태그 삭제
    await EXEC_STMT_TAG.delete1({ conn, execStmtIdx });

    // [STEP 3] 태그 생성
    const tagIdxAry = await TAG_SVC.saveTagAry({ conn, tagAry });

    // [STEP 4] 신규 태그 저장
    await bulkSaveTagLink({ conn, execStmtIdx, tagIdxAry });
};

/**
 * @description 실행문 검색
 * @param {Object} arg { conn, numPage, ty, srchTitle, srchAry }
 * @returns {Object} { totCnt, execStmtList }
 */
const getExecStmtList = async (arg) => {
    const {
        conn, numPage, ty, srchTitle, srchAry
    } = arg;

    const limit = 10;
    const offset = (numPage - 1) * 10;

    if (ty === '1') { // 태그 검색
        // 실행문 카운트
        const totCnt = await EXEC_STMT.select2({ conn, srchAry });

        if (totCnt) {
            // 태그 배열에 속한 태그를 모두 가지고 있는 실행문 인덱스
            const execStmtIdxList = await EXEC_STMT.select3({
                conn, srchAry, offset, limit
            });
            const execStmtIdxAry = execStmtIdxList.map(({ idx }) => idx);

            // 인덱스 배열에 해당하는 인덱스, 제목 로드
            const execStmtList = await EXEC_STMT.select4({ conn, execStmtIdxAry });

            return { totCnt, execStmtList };
        } else {
            return { totCnt };
        }
    } else { // 제목 검색
        const totCnt = await EXEC_STMT.select5({ conn, title: srchTitle });

        if (totCnt) {
            const execStmtList = await EXEC_STMT.select6({
                conn, title: srchTitle, offset, limit
            });
            return { totCnt, execStmtList };
        } else {
            return { totCnt };
        }
    }
};

module.exports = {
    addExecStmt,
    getExecStmtByIdx,
    rmExecStmtByIdx,
    mdfyExecStmt,
    getExecStmtList
};
