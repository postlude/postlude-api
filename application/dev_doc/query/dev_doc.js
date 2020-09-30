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
    update1,
    delete1
};
