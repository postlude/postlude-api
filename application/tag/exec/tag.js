/**
 * @fileoverview application/tag/exec/tag.js
 */

const TAG = require('../query/tag');

/**
 * @description 태그 UPSERT
 * @param {Object} arg { conn, tag }
 * @returns {number} tagIdx
 */
const insert1 = async (arg) => {
    const { conn, tag } = arg;

    const [{ insertId }] = await conn.execute(TAG.insert1, { tag });

    return insertId;
};

/**
 * @description 개발 링크에 등록된 모든 태그 로드
 * @param {Object} arg { conn }
 * @returns {Array}
 */
const select1 = async (arg) => {
    const { conn } = arg;

    const [result] = await conn.execute(TAG.select1);

    return result;
};

/**
 * @description 실행문에 등록된 모든 태그 로드
 * @param {Object} arg { conn }
 * @returns {Array}
 */
const select2 = async (arg) => {
    const { conn } = arg;

    const [result] = await conn.execute(TAG.select2);

    return result;
};

module.exports = {
    insert1,
    select1,
    select2
};
