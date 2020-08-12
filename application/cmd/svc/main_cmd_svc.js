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

    const afctdRows = await SUB_CMD.insert1({ conn, rows });

    if (afctdRows !== subCmdList.length) {
        throw new CstmErr('[main_cmd_svc] addCmd - SUB CMD INSERT FAIL', RSPNS.FAIL_QUERY_EXEC);
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
        throw new CstmErr('[main_cmd_svc] addCmd - MAIN CMD INSERT FAIL', RSPNS.FAIL_QUERY_EXEC);
    }
};

/**
 * @description 명령어 수정
 * @param {Object} arg { conn, mainCmd, subCmdList }
 */
exports.modifyCmd = async (arg) => {
    const { conn, mainCmd, subCmdList } = arg;

    // [STEP 1] 메인 명령어 수정
    const afctdRows = await MAIN_CMD.update1({ conn, mainCmd });

    if (afctdRows === 1) {
        if (Array.isArray(subCmdList)) {
            const { idx: mainCmdIdx } = mainCmd;

            // [STEP 2] 메인 명령어에 연결된 서브 명령어 전체 삭제
            await SUB_CMD.delete1({ conn, mainCmdIdx });

            // [STEP 3] 신규 서브 명령어 BULK INSERT
            if (subCmdList.length) {
                await addSubCmd({ conn, mainCmdIdx, subCmdList });
            }
        }
    } else {
        throw new CstmErr('[main_cmd_svc] modifyCmd - MAIN CMD UPDATE FAIL', RSPNS.FAIL_QUERY_EXEC);
    }
};

/**
 * @description 메인 명령어 검색
 * @param {Object} arg { conn, numPage, mainCmd }
 * @returns {Object} { totCnt, mainCmdList }
 */
exports.getMainCmdList = async (arg) => {
    const { conn, numPage, mainCmd } = arg;

    const limit = 10;
    const offset = (numPage - 1) * limit;

    const totCnt = await MAIN_CMD.select2({ conn, mainCmd });

    if (totCnt) {
        const mainCmdList = await MAIN_CMD.select1({
            conn, mainCmd, offset, limit
        });

        return { totCnt, mainCmdList };
    } else {
        return { totCnt };
    }
};
