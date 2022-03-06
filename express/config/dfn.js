/**
 * @fileoverview config/dfn.js
 */

/**
 * @description response 코드
 */
const RSPNS = {
    SUCCES: { code: 1000 },
    FAIL: { code: 2000 },
    FAIL_INVLD_FIELD: { code: 2001 },
    FAIL_QUERY_EXEC: { code: 2002 },
    FAIL_NOT_EXISTED_DATA: { code: 2003 },
    FAIL_INVLD_PW: { code: 2004 },
    FAIL_TKN: { code: 2005 }
};

/**
 * @description 태그 타입
 */
const TAG_TY = {
    DEV_LINK: 1,
    EXEC_STMT: 2
};

module.exports = {
    RSPNS,
    TAG_TY
};
