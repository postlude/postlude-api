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

/**
 * @description 개발 문서 인덱스로 연결 삭제
 * @param {Object} arg { conn, devDocIdx }
 */
const delete1 = async (arg) => {
    const { conn, devDocIdx } = arg;

    await conn.execute(DEV_DOC_TAG_LNK.delete1, { devDocIdx });
};

module.exports = {
    insert1,
    delete1
};
