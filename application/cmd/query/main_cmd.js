/**
 * @fileoverview application/cmd/query/main_cmd.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        MAIN_CMD (
            CMD, DC, FRMT, EX
        )
    VALUES (
        :cmd, :dc, :frmt, :ex
    )
`;

/* ================================================== [SELECT] ================================================== */

const select1 = `
    SELECT
        IDX AS idx,
        CMD AS cmd,
        RGST_DT AS rgstDt,
        UPDT_DT AS updtDt
    FROM
        MAIN_CMD
    WHERE
        CMD LIKE :cmd
    ORDER BY
        CMD ASC
    LIMIT
        :offset, :limit
`;

const select2 = `
    SELECT
        COUNT(*) AS cnt
    FROM
        MAIN_CMD
    WHERE
        CMD LIKE :cmd
`;

const select3 = `
    SELECT
        M.CMD AS cmd,
        M.DC AS dc,
        M.FRMT AS frmt,
        M.EX AS ex,
        M.RGST_DT AS rgstDt,
        M.UPDT_DT AS updtDt,
        O.IDX AS optnIdx,
        O.CMD_OPTN AS cmdOptn,
        O.DC AS optnDc,
        O.FRMT AS optnFrmt,
        O.EX AS optnEx
    FROM
        MAIN_CMD M
    LEFT OUTER JOIN
        OPTN O
    ON
        M.IDX = O.CMD_IDX AND O.TY = 1
    WHERE
        M.IDX = :mainCmdIdx
`;

/* ================================================== [UPDATE] ================================================== */

const update1 = `
    UPDATE
        MAIN_CMD
    SET
        CMD = :cmd,
        DC = :dc,
        FRMT = :frmt,
        EX = :ex
    WHERE
        IDX = :idx
`;

/* ================================================== [DELETE] ================================================== */

module.exports = {
    insert1,
    select1,
    select2,
    select3,
    update1
};
