/**
 * @fileoverview application/cmd/exec/main_cmd.js
 */

const MAIN_CMD = require('../query/main_cmd');

/**
 * @description 메인 명령어 1개 INSERT
 * @param {Object} arg { conn, mainCmd }
 * @returns {number} mainCmdIdx
 */
const insert1 = async (arg) => {
    const { conn, mainCmd } = arg;

    const [{ insertId }] = await conn.execute(MAIN_CMD.insert1, mainCmd);

    return insertId;
};

/**
 * @description 메인 명령어 검색
 * @param {Object} arg { conn, mainCmd, offset, limit }
 * @returns {Array}
 */
const select1 = async (arg) => {
    const {
        conn, mainCmd, offset, limit
    } = arg;

    const [result] = await conn.execute(MAIN_CMD.select1, {
        cmd: `${mainCmd}%`,
        offset,
        limit
    });

    return result;
};

/**
 * @description 메인 명령어 검색 전체 카운트
 * @param {Object} arg { conn, mainCmd }
 * @returns {number} cnt
 */
const select2 = async (arg) => {
    const { conn, mainCmd } = arg;

    const [[{ cnt }]] = await conn.execute(MAIN_CMD.select2, { cmd: `${mainCmd}%` });

    return cnt;
};

/**
 * @description 인덱스로 메인 명령어 + 옵션 로드
 * @param {Object} arg { conn, mainCmdIdx }
 * @returns {Array}
 */
const select3 = async (arg) => {
    const { conn, mainCmdIdx } = arg;

    const [result] = await conn.execute(MAIN_CMD.select3, { mainCmdIdx });

    return result;
};

/**
 * @description 메인 명령어 인덱스로 UPDATE
 * @param {Object} arg { conn, mainCmd }
 * @returns {number} affectedRows
 */
const update1 = async (arg) => {
    const { conn, mainCmd } = arg;

    const [{ affectedRows }] = await conn.execute(MAIN_CMD.update1, mainCmd);

    return affectedRows;
};

module.exports = {
    insert1,
    select1,
    select2,
    select3,
    update1
};
