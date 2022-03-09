/**
 * @fileoverview application/dev_link/query/dev_link.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        DEV_LINK (
            TITLE, URL
        )
    VALUES (
        :title, :url
    )
`;

/* ================================================== [SELECT] ================================================== */

const select1 = `
    SELECT
        L.IDX AS idx
    FROM
        DEV_LINK L
    INNER JOIN
        DEV_LINK_TAG LT
    ON
        L.IDX = LT.DEV_LINK_IDX
    INNER JOIN
        TAG T
    ON
        LT.TAG_IDX = T.IDX
    WHERE
        T.TAG IN (?)
    GROUP BY
        L.IDX
    HAVING
        COUNT(L.IDX) = ?
    ORDER BY
        L.IDX ASC
    LIMIT
        ?, ?
`;

const select2 = `
    SELECT
        COUNT(idx) AS cnt
    FROM (
        SELECT
            L.IDX AS idx
        FROM
            DEV_LINK L
        INNER JOIN
            DEV_LINK_TAG LT
        ON
            L.IDX = LT.DEV_LINK_IDX
        INNER JOIN
            TAG T
        ON
            LT.TAG_IDX = T.IDX
        WHERE
            T.TAG IN (?)
        GROUP BY
            L.IDX
        HAVING
            COUNT(L.IDX) = ?
    ) A
`;

const select3 = `
    SELECT
        IDX AS idx,
        TITLE AS title,
        URL AS url
    FROM
        DEV_LINK
    WHERE
        TITLE LIKE :title
    LIMIT
        :offset, :limit
`;

const select4 = `
    SELECT
        COUNT(IDX) AS cnt
    FROM
        DEV_LINK
    WHERE
        TITLE LIKE :title
`;

const select5 = `
    SELECT
        D.IDX AS idx,
        D.TITLE AS title,
        D.URL AS url,
        CONCAT('[', GROUP_CONCAT(JSON_QUOTE(T.TAG)), ']') AS tagAry
    FROM
        DEV_LINK D
    INNER JOIN
        DEV_LINK_TAG L
    ON
        D.IDX = L.DEV_LINK_IDX
    INNER JOIN
        TAG T
    ON
        L.TAG_IDX = T.IDX
    WHERE
        D.IDX = :devLinkIdx
    GROUP BY
        D.IDX
`;

const select6 = `
    SELECT
        IDX AS idx,
        TITLE AS title,
        URL AS url
    FROM
        DEV_LINK
    WHERE
        IDX IN (?)
    ORDER BY
        IDX ASC
`;

/* ================================================== [UPDATE] ================================================== */

const update1 = `
    UPDATE
        DEV_LINK
    SET
        TITLE = :title,
        URL = :url
    WHERE
        IDX = :idx
`;

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        DEV_LINK
    WHERE
        IDX = :idx
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
