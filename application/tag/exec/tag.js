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

module.exports = {
    insert1
};
