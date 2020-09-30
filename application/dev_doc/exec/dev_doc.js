/**
 * @fileoverview application/dev_doc/exec/dev_doc.js
 */

const DEV_DOC = require('../query/dev_doc');

/**
 * @description 개발 문서 1개 INSERT
 * @param {Object} arg { conn, devDoc }
 * @returns {number} devDocIdx
 */
const insert1 = async (arg) => {
    const { conn, devDoc } = arg;

    const [{ insertId }] = await conn.execute(DEV_DOC.insert1, devDoc);

    return insertId;
};

/**
 * @description 개발 문서 1개 수정
 * @param {Object} arg { conn, devDoc }
 */
const update1 = async (arg) => {
    const { conn, devDoc } = arg;

    await conn.execute(DEV_DOC.update1, devDoc);
};

/**
 * @description 개발 문서 1개 삭제
 * @param {Object} arg { conn, devDocIdx }
 */
const delete1 = async (arg) => {
    const { conn, devDocIdx } = arg;

    await conn.execute(DEV_DOC.delete1, { idx: devDocIdx });
};

module.exports = {
    insert1,
    update1,
    delete1
};
