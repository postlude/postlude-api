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
 * @description 개발 문서 태그 검색
 * @param {Object} arg { conn, tag, offset, limit }
 * @returns {Array}
 */
const select1 = async (arg) => {
    const {
        conn, tag, offset, limit
    } = arg;

    const [result] = await conn.execute(DEV_DOC.select1, { tag, offset, limit });

    return result;
};

/**
 * @description 개발 문서 태그 검색 전체 카운트
 * @param {Object} arg { conn, tag }
 * @returns {number} cnt
 */
const select2 = async (arg) => {
    const { conn, tag } = arg;

    const [[{ cnt }]] = await conn.execute(DEV_DOC.select2, { tag });

    return cnt;
};

/**
 * @description 개발 문서 제목 검색
 * @param {Object} arg { conn, title, offset, limit }
 * @returns {Array}
 */
const select3 = async (arg) => {
    const {
        conn, title, offset, limit
    } = arg;

    const [result] = await conn.execute(DEV_DOC.select3, {
        title: `%${title}%`,
        offset,
        limit
    });

    return result;
};

/**
 * @description 개발 문서 제목 검색 전체 카운트
 * @param {Object} arg { conn, title }
 * @returns {number} cnt
 */
const select4 = async (arg) => {
    const { conn, title } = arg;

    const [[{ cnt }]] = await conn.execute(DEV_DOC.select4, { title: `%${title}%` });

    return cnt;
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
    select1,
    select2,
    select3,
    select4,
    update1,
    delete1
};
