/**
 * @fileoverview application/cmd/query/sub_cmd.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        SUB_CMD (
            MAIN_CMD_IDX, CMD, DC, FRMT, EX
        )
    VALUES
        ?
`;

const insert2 = `
    INSERT INTO
        SUB_CMD (
            MAIN_CMD_IDX, CMD, DC, FRMT, EX
        )
    VALUES (
        :mainCmdIdx, :cmd, :dc, :frmt, :ex
    )
    ON DUPLICATE KEY UPDATE
        DC = :dc, FRMT = :frmt, EX = :ex
`;

/* ================================================== [SELECT] ================================================== */

/* ================================================== [UPDATE] ================================================== */

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        SUB_CMD
    WHERE
        MAIN_CMD_IDX = :mainCmdIdx
`;

module.exports = {
    insert1,
    insert2,
    delete1
};
