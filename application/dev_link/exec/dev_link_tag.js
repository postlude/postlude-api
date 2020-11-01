/**
 * @fileoverview application/dev_link/exec/dev_link_tag.js
 */

const DEV_LINK_TAG = require('../query/dev_link_tag');

/**
 * @description 개발 문서 태그 연결 BULK INSERT
 * @param {Object} arg { conn, row }
 */
const insert1 = async (arg) => {
    const { conn, row } = arg;

    await conn.query(DEV_LINK_TAG.insert1, [row]);
};

/**
 * @description 개발 문서 인덱스로 연결 삭제
 * @param {Object} arg { conn, devLinkIdx }
 */
const delete1 = async (arg) => {
    const { conn, devLinkIdx } = arg;

    await conn.execute(DEV_LINK_TAG.delete1, { devLinkIdx });
};

module.exports = {
    insert1,
    delete1
};
