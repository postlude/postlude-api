/**
 * @fileoverview application/cmd/svc/main_cmd_svc.js
 */

const { RSPNS, OPTN_TY } = require('@/config/define');
const MAIN_CMD = require('../exec/main_cmd');
const SUB_CMD = require('../exec/sub_cmd');
const OPTN_SVC = require('./optn_svc');
const OPTN = require('../exec/optn');

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
 * @description 메인 명령어 신규 저장
 * @param {Object} arg { conn, mainCmd, optnList }
 */
exports.addMainCmd = async (arg) => {
    const { conn, mainCmd, optnList } = arg;

    const mainCmdIdx = await MAIN_CMD.insert1({ conn, mainCmd });

    if (mainCmdIdx) {
        if (Array.isArray(optnList) && optnList.length) {
            await OPTN_SVC.addMltplOptn({
                conn,
                ty: OPTN_TY.MAIN_CMD,
                cmdIdx: mainCmdIdx,
                optnList
            });
        }
    } else {
        throw new CstmErr('[main_cmd_svc] addMainCmd - MAIN CMD INSERT FAIL', RSPNS.FAIL_QUERY_EXEC);
    }
};

/**
 * @description 메인 명령어 수정
 * @param {Object} arg { conn, mainCmd, optnList }
 */
exports.modifyMainCmd = async (arg) => {
    const { conn, mainCmd, optnList } = arg;

    // [STEP 1] 메인 명령어 수정
    const afctdRows = await MAIN_CMD.update1({ conn, mainCmd });

    if (afctdRows === 1) {
        if (Array.isArray(optnList)) {
            const { idx: mainCmdIdx } = mainCmd;

            // [STEP 2] 메인 명령어에 연결된 옵션 전체 삭제
            await OPTN.delete1({
                conn,
                ty: OPTN_TY.MAIN_CMD,
                cmdIdx: mainCmdIdx
            });

            // [STEP 3] 신규 옵션 BULK INSERT
            if (optnList.length) {
                await OPTN_SVC.addMltplOptn({
                    conn,
                    ty: OPTN_TY.MAIN_CMD,
                    cmdIdx: mainCmdIdx,
                    optnList
                });
            }
        }
    } else {
        throw new CstmErr('[main_cmd_svc] modifyMainCmd - MAIN CMD UPDATE FAIL', RSPNS.FAIL_QUERY_EXEC);
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

/**
 * @description 메인 명령어 + 옵션 로드
 * @param {Object} arg { conn, mainCmdIdx }
 * @returns {Object} { mainCmd, optnList }
 */
exports.getMainCmdByIdx = async (arg) => {
    const { conn, mainCmdIdx } = arg;

    const mainCmdList = await MAIN_CMD.select3({ conn, mainCmdIdx });

    if (mainCmdList.length) {
        const {
            cmd, dc, frmt, ex, rgstDt, updtDt
        } = mainCmdList[0];

        const optnList = [];
        mainCmdList.forEach((optn) => {
            const {
                optnIdx, cmdOptn, optnDc, optnFrmt, optnEx
            } = optn;

            if (optnIdx) {
                optnList.push({
                    idx: optnIdx,
                    cmdOptn,
                    dc: optnDc,
                    frmt: optnFrmt,
                    ex: optnEx
                });
            }
        });

        return {
            mainCmd: {
                cmd,
                dc,
                frmt,
                ex,
                rgstDt,
                updtDt
            },
            optnList
        };
    } else {
        throw new CstmErr(
            '[main_cmd_svc] getMainCmdByIdx - NOT EXISTED MAIN CMD',
            RSPNS.FAIL_NOT_EXISTED_DATA
        );
    }
};
