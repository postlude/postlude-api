/**
 * @fileoverview application/cmd/svc/main_cmd_svc.js
 */

const { RSPNS } = require('@/config/define');
const MAIN_CMD = require('../exec/main_cmd');
const SUB_CMD = require('../exec/sub_cmd');

/**
 * @description 서브 명령어 BULK INSERT
 * @param {Object} arg { conn, mainCmdIdx, subCmdList }
 */
const addSubCmd = async (arg) => {
    const { conn, mainCmdIdx, subCmdList } = arg;

    const rows = [];

    subCmdList.forEach((subCmd) => {
        const {
            cmd, dc, frmt, ex
        } = subCmd;

        rows.push([mainCmdIdx, cmd, dc, frmt, ex]);
    });

    const affectedRows = await SUB_CMD.insert1({ conn, rows });

    if (affectedRows !== subCmdList.length) {
        throw new CstmErr('[main_cmd_svc] addCmd - SUB CMD INSERT FAIL', RSPNS.FAIL);
    }
};

/**
 * @description 명령어 신규 저장
 * @param {Object} arg { conn, mainCmd, subCmdList }
 */
exports.addCmd = async (arg) => {
    const { conn, mainCmd, subCmdList } = arg;

    const mainCmdIdx = await MAIN_CMD.insert1({ conn, mainCmd });

    if (mainCmdIdx) {
        if (Array.isArray(subCmdList) && subCmdList.length) {
            await addSubCmd({ conn, mainCmdIdx, subCmdList });
        }
    } else {
        throw new CstmErr('[main_cmd_svc] addCmd - MAIN CMD INSERT FAIL', RSPNS.FAIL);
    }
};
