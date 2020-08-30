/**
 * @fileoverview config/define.js
 */

/**
 * @description response 코드
 */
exports.RSPNS = {
    SUCCES: { code: 1000 },
    FAIL: { code: 2000 },
    FAIL_INVLD_FIELD: { code: 2001 },
    FAIL_QUERY_EXEC: { code: 2002 },
    FAIL_NOT_EXISTED_DATA: { code: 2003 }
};

/**
 * @description 옵션 타입
 */
exports.OPTN_TY = {
    MAIN_CMD: 1,
    SUB_CMD: 2
};
