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
        S.IDX AS idx,
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

const select2 = `
    SELECT
        COUNT(idx) AS cnt
    FROM (
        SELECT
            S.IDX AS idx
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
            T.TAG IN (?)
        GROUP BY
            S.IDX
        HAVING
            COUNT(S.IDX) = ?
    ) A
`;

const select3 = `
    SELECT
        S.IDX AS idx
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
        T.TAG IN (?)
    GROUP BY
        S.IDX
    HAVING
        COUNT(S.IDX) = ?
    ORDER BY
        S.IDX ASC
    LIMIT
        ?, ?
`;

const select4 = `
    SELECT
        IDX AS idx,
        TITLE AS title
    FROM
        EXEC_STMT
    WHERE
        IDX IN (?)
    ORDER BY
        IDX ASC
`;

const select5 = `
    SELECT
        COUNT(IDX) AS cnt
    FROM
        EXEC_STMT
    WHERE
        TITLE LIKE :title
`;

const select6 = `
    SELECT
        IDX AS idx,
        TITLE AS title
    FROM
        EXEC_STMT
    WHERE
        TITLE LIKE :title
    LIMIT
        :offset, :limit
`;

/* ================================================== [UPDATE] ================================================== */

const update1 = `
    UPDATE
        EXEC_STMT
    SET
        TITLE = :title,
        STMT = :stmt,
        DC = :dc
    WHERE
        IDX = :idx
`;

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
    select2,
    select3,
    select4,
    select5,
    select6,
    update1,
    delete1
};
