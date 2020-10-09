/**
 * @fileoverview application/dev_doc/query/dev_doc.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        DEV_DOC (
            TITLE, URL
        )
    VALUES (
        :title, :url
    )
`;

/* ================================================== [SELECT] ================================================== */

const select1 = `
    SELECT
        D.IDX AS idx,
        D.TITLE AS title,
        D.URL AS url
    FROM
        DEV_DOC D
    INNER JOIN
        DEV_DOC_TAG_LNK L
    ON
        D.IDX = L.DEV_DOC_IDX
    INNER JOIN
        TAG T
    ON
        L.TAG_IDX = T.IDX
    WHERE
        T.TAG = :tag
    LIMIT
        :offset, :limit
`;

const select2 = `
    SELECT
        COUNT(D.IDX) AS cnt
    FROM
        DEV_DOC D
    INNER JOIN
        DEV_DOC_TAG_LNK L
    ON
        D.IDX = L.DEV_DOC_IDX
    INNER JOIN
        TAG T
    ON
        L.TAG_IDX = T.IDX
    WHERE
        T.TAG = :tag
`;

const select3 = `
    SELECT
        TITLE AS title,
        URL AS url
    FROM
        DEV_DOC
    WHERE
        title LIKE :title
    LIMIT
        :offset, :limit
`;

const select4 = `
    SELECT
        COUNT(IDX) AS cnt
    FROM
        DEV_DOC
    WHERE
        title LIKE :title
`;

/* ================================================== [UPDATE] ================================================== */

const update1 = `
    UPDATE
        DEV_DOC
    SET
        TITLE = :title,
        URL = :url
    WHERE
        IDX = :idx
`;

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        DEV_DOC
    WHERE
        IDX = :idx
`;

module.exports = {
    insert1,
    select1,
    select2,
    select3,
    select4,
    update1,
    delete1
};
