/**
 * @fileoverview application/cmd/cntlr/main_cmd_cntlr.js
 */

const MYSQL = require('@/config/mysql');
const { RSPNS } = require('@/config/define');
const MAIN_CMD_SVC = require('../svc/main_cmd_svc');

/**
 * @description 메인 명령어 저장 API
 */
exports.addMainCmd = async (req, res) => {
    let conn = null;

    try {
        const { mainCmd, optnList } = req.body;

        if (mainCmd) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await MAIN_CMD_SVC.addMainCmd({ conn, mainCmd, optnList });

            conn.commit();
            res.send(RSPNS.SUCCES);
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (conn) {
            conn.rollback();
        }
        if (err instanceof CstmErr) {
            console.error(err.msg);
            res.send(err.rspns);
        } else {
            console.error(err);
            res.send(RSPNS.FAIL);
        }
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

/**
 * @description 메인 명령어 수정 API
 */
exports.modifyMainCmd = async (req, res) => {
    let conn = null;

    try {
        const { mainCmd, optnList } = req.body;

        if (mainCmd) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await MAIN_CMD_SVC.modifyMainCmd({ conn, mainCmd, optnList });

            conn.commit();
            res.send(RSPNS.SUCCES);
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (conn) {
            conn.rollback();
        }
        if (err instanceof CstmErr) {
            console.error(err.msg);
            res.send(err.rspns);
        } else {
            console.error(err);
            res.send(RSPNS.FAIL);
        }
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

/**
 * @description 메인 명령어 검색 API
 */
exports.getMainCmdList = async (req, res) => {
    let conn = null;

    try {
        const { page, mainCmd } = req.query;

        const numPage = parseInt(page, 10);

        if (Number.isFinite(numPage)) {
            conn = await MYSQL.getConn();

            const result = await MAIN_CMD_SVC.getMainCmdList({ conn, numPage, mainCmd });

            res.send({
                ...RSPNS.SUCCES,
                ...result
            });
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (err instanceof CstmErr) {
            console.error(err.msg);
            res.send(err.rspns);
        } else {
            console.error(err);
            res.send(RSPNS.FAIL);
        }
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

exports.getMainCmd = async (req, res) => {
    let conn = null;

    try {
        const { idx } = req.params;

        const mainCmdIdx = parseInt(idx, 10);

        if (Number.isFinite(mainCmdIdx)) {
            conn = await MYSQL.getConn();

            const mainCmd = await MAIN_CMD_SVC.getCmdByIdx({ conn, mainCmdIdx });

            res.send({
                ...RSPNS.SUCCES,
                mainCmd
            });
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (err instanceof CstmErr) {
            console.error(err.msg);
            res.send(err.rspns);
        } else {
            console.error(err);
            res.send(RSPNS.FAIL);
        }
    } finally {
        if (conn) {
            conn.release();
        }
    }
};
