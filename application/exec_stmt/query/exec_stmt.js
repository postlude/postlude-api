/**
 * @fileoverview application/exec_stmt/query/exec_stmt.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        EXEC_STMT (
            TITLE, STMT, DC
        )
    VALUES (
        :title, :stmt, :dc
    )
`;

/* ================================================== [SELECT] ================================================== */

const select1 = `
    SELECT
        S.TITLE AS title,
        S.STMT AS stmt,
        S.DC AS dc,
        CONCAT('[', GROUP_CONCAT(JSON_QUOTE(T.TAG)), ']') AS tagAry
    FROM
        EXEC_STMT S
    INNER JOIN
        EXEC_STMT_TAG ST
    ON
        S.IDX = ST.EXEC_STMT_IDX
    INNER JOIN
        TAG T
    ON
        ST.TAG_IDX = T.IDX
    WHERE
        S.IDX = :execStmtIdx
    GROUP BY
        S.IDX
`;

/* ================================================== [UPDATE] ================================================== */

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        EXEC_STMT
    WHERE
        IDX = :execStmtIdx
`;

module.exports = {
    insert1,
    select1,
    delete1
};
