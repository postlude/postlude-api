/**
 * @fileoverview application/tag/query/tag.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        TAG (
            TAG
        )
    VALUES (
        :tag
    )
    ON DUPLICATE KEY UPDATE
        UPDT_DT = NOW()
`;

/* ================================================== [SELECT] ================================================== */

const select1 = `
    SELECT
        T.TAG AS tag,
        COUNT(T.IDX) AS cnt
    FROM
        DEV_LINK_TAG LT
    INNER JOIN
        TAG T
    ON
        LT.TAG_IDX = T.IDX
    GROUP BY
        LT.TAG_IDX
    ORDER BY
        T.TAG ASC
`;

const select2 = `
    SELECT
        T.TAG AS tag,
        COUNT(T.IDX) AS cnt
    FROM
        EXEC_STMT_TAG ST
    INNER JOIN
        TAG T
    ON
        ST.TAG_IDX = T.IDX
    GROUP BY
        ST.TAG_IDX
    ORDER BY
        T.TAG ASC
`;

/* ================================================== [UPDATE] ================================================== */

/* ================================================== [DELETE] ================================================== */

module.exports = {
    insert1,
    select1,
    select2
};
