/**
 * @fileoverview application/cmd/cmd_cntlr.js
 */

const MYSQL = require('@/config/mysql');
const { RSPNS } = require('@/config/define');
const MAIN_CMD_SVC = require('./svc/main_cmd_svc');

/**
 * @description 명령어 저장 api
 */
exports.addCmd = async (req, res) => {
    let conn = null;

    try {
        const { mainCmd, subCmdList } = req.body;

        if (mainCmd) {
            conn = await MYSQL.getConn();

            await MAIN_CMD_SVC.addCmd({ conn, mainCmd, subCmdList });

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
