/**
 * @fileoverview application/tag/svc/tag_svc.js
 */

const { syncAryPrll } = require('@/helper/async');
const TAG = require('../exec/tag');

/**
 * @description 태그 저장(syncAryPrll 로직 함수)
 * @param {string} tag
 * @param {Object} arg { conn, tagIdxAry }
 */
const saveTag = async (tag, arg) => {
    const { conn, tagIdxAry } = arg;

    if (tag) {
        const tagIdx = await TAG.insert1({ conn, tag });
        tagIdxAry.push(tagIdx);
    }
};

/**
 * @description 태그 배열 저장
 * @param {Object} arg { conn, tagAry }
 * @returns {Array} tagIdxAry
 */
exports.saveTagAry = async (arg) => {
    const { conn, tagAry } = arg;

    const tagIdxAry = [];
    await syncAryPrll(tagAry, saveTag, { conn, tagIdxAry });

    return tagIdxAry;
};
