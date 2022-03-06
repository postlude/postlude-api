/**
 * @fileoverview application/exec_stmt/cntlr/exec_stmt_cntlr.js
 */

const { RSPNS } = require('@/config/dfn');
const MYSQL = require('@/config/mysql');
const EXEC_STMT_SVC = require('../svc/exec_stmt_svc');

/**
 * @description 실행문 생성 API
 */
const addExecStmt = async (req, res) => {
    let conn = null;

    try {
        const { execStmt, tagAry } = req.body;

        if (execStmt && Array.isArray(tagAry) && tagAry.length) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await EXEC_STMT_SVC.addExecStmt({ conn, execStmt, tagAry });

            await conn.commit();
            res.send(RSPNS.SUCCES);
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

/**
 * @description 실행문 1개 로드 API
 */
const getExecStmt = async (req, res) => {
    let conn = null;

    try {
        const { idx } = req.params;

        const execStmtIdx = parseInt(idx, 10);

        if (Number.isFinite(execStmtIdx)) {
            conn = await MYSQL.getConn();

            const result = await EXEC_STMT_SVC.getExecStmtByIdx({ conn, execStmtIdx });

            res.send({
                ...result,
                ...RSPNS.SUCCES
            });
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

/**
 * @description 실행문 삭제 API
 */
const rmExecStmt = async (req, res) => {
    let conn = null;

    try {
        const { idx } = req.params;

        const execStmtIdx = parseInt(idx, 10);

        if (Number.isFinite(execStmtIdx)) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await EXEC_STMT_SVC.rmExecStmtByIdx({ conn, execStmtIdx });

            await conn.commit();
            res.send(RSPNS.SUCCES);
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

/**
 * @description 실행문 수정 API
 */
const mdfyExecStmt = async (req, res) => {
    let conn = null;

    try {
        const { execStmt, tagAry } = req.body;

        if (execStmt && Array.isArray(tagAry) && tagAry.length) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await EXEC_STMT_SVC.mdfyExecStmt({ conn, execStmt, tagAry });

            await conn.commit();
            res.send(RSPNS.SUCCES);
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

/**
 * @description 문서 검색시 파라미터 체크
 * 제목 검색은 3자 이상부터 가능
 * @param {Object} arg { numPage, ty, srchTitle, srchAry }
 * @returns {boolean}
 */
const chckParam = (arg) => {
    const {
        numPage, ty, srchTitle, srchAry
    } = arg;

    if (Number.isFinite(numPage)) {
        if (ty === '1' && Array.isArray(srchAry) && srchAry.length) {
            return true;
        } else if (ty === '2' && srchTitle && srchTitle.length > 2) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * @description 실행문 검색 API
 */
const getExecStmtList = async (req, res) => {
    let conn = null;

    try {
        const {
            page, ty, srchTitle, srchTagAry
        } = req.query;

        const numPage = parseInt(page, 10);
        const srchAry = JSON.parse(srchTagAry);

        const isValid = chckParam({
            numPage, ty, srchTitle, srchAry
        });

        if (isValid) {
            conn = await MYSQL.getConn();

            const result = await EXEC_STMT_SVC.getExecStmtList({
                conn, numPage, ty, srchTitle, srchAry
            });

            res.send({
                ...result,
                ...RSPNS.SUCCES
            });
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

module.exports = {
    addExecStmt,
    getExecStmt,
    rmExecStmt,
    mdfyExecStmt,
    getExecStmtList
};
