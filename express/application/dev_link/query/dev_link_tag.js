/**
 * @fileoverview application/dev_link/query/dev_link_tag.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        DEV_LINK_TAG (
            DEV_LINK_IDX, TAG_IDX
        )
    VALUES
        ?
`;

/* ================================================== [SELECT] ================================================== */

/* ================================================== [UPDATE] ================================================== */

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        DEV_LINK_TAG
    WHERE
        DEV_LINK_IDX = :devLinkIdx
`;

module.exports = {
    insert1,
    delete1
};
