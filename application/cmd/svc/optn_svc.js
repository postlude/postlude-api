/**
 * @fileoverview application/cmd/svc/optn_svc.js
 */

const { RSPNS } = require('@/config/dfn');
const OPTN = require('../exec/optn');

/**
 * @description 옵션 BULK INSERT
 * @param {Object} arg { conn, ty, cmdIdx, optnList }
 */
exports.addMltplOptn = async (arg) => {
    const {
        conn, ty, cmdIdx, optnList
    } = arg;

    const rows = [];

    optnList.forEach((optn) => {
        const {
            cmdOptn, dc, frmt, ex
        } = optn;

        rows.push([ty, cmdIdx, cmdOptn, dc, frmt, ex]);
    });

    const afctdRows = await OPTN.insert1({ conn, rows });

    if (afctdRows !== optnList.length) {
        throw new CstmErr('[optn_svc] addMltplOptn - OPTION BULK INSERT FAIL', RSPNS.FAIL_QUERY_EXEC);
    }
};
