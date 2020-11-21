/**
 * @fileoverview application/exec_stmt/cntlr/exec_stmt_cntlr.js
 */

const MYSQL = require('@/config/mysql');
const { RSPNS } = require('@/config/dfn');
const EXEC_STMT_SVC = require('../svc/exec_stmt_svc');

/**
 * @description 실행문 생성 API
 */
exports.addExecStmt = async (req, res) => {
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
