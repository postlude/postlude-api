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
    update1
};
