/**
 * @fileoverview application/dev_doc/exec/dev_doc_tag_lnk.js
 */

const DEV_DOC_TAG_LNK = require('../query/dev_doc_tag_lnk');

/**
 * @description 개발 문서 태그 연결 BULK INSERT
 * @param {Object} arg { conn, row }
 */
const insert1 = async (arg) => {
    const { conn, row } = arg;

    await conn.query(DEV_DOC_TAG_LNK.insert1, [row]);
};

module.exports = {
    insert1
};
