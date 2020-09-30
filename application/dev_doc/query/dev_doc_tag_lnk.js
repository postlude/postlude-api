/**
 * @fileoverview application/dev_doc/query/dev_doc_tag_lnk.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        DEV_DOC_TAG_LNK (
            DEV_DOC_IDX, TAG_IDX
        )
    VALUES
        ?
`;

/* ================================================== [SELECT] ================================================== */

/* ================================================== [UPDATE] ================================================== */

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        DEV_DOC_TAG_LNK
    WHERE
        DEV_DOC_IDX = :devDocIdx
`;

module.exports = {
    insert1,
    delete1
};
